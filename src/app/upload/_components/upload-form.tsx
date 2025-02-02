"use client";
import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useScaleDataStore from "@/hooks/useScaleDataStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx"; // Import the xlsx library
import * as z from "zod";

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a file." })
    .refine(
      (file) => file.name.endsWith(".xlsx"),
      "Only .xlsx files are allowed"
    ),
});

export default function UploadForm() {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1, // Allow only one file
    maxSize: 1024 * 1024 * 4, // 4MB
    multiple: false, // Disable multiple files
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined, // Initialize with no file
    },
  });

  const { setJsonData } = useScaleDataStore();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const file = values.file;

      // Read the file as an ArrayBuffer
      const data = await file.arrayBuffer();

      // Parse the Excel file
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to a JavaScript object
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setJsonData(jsonData);

      router.push("/");

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(jsonData, null, 2)}
          </code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to process the file. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(files) => {
                    setFiles(files);
                    if (files && files.length > 0) {
                      field.onChange(files[0]); // Pass the first file to the form field
                    } else {
                      field.onChange(undefined); // Clear the field if no file is selected
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Only .xlsx files are allowed
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a .xlsx file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
