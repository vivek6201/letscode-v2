"use client";
import React, { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  BugPriority,
  reportValidations,
  ReportValidationType,
} from "@/validations/miscellaneousValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportDialog = forwardRef((props, ref: React.Ref<HTMLButtonElement>) => {
  const [openState, setOpenState] = useState(false);
  const form = useForm<ReportValidationType>({
    resolver: zodResolver(reportValidations),
    defaultValues: {
      title: "",
      description: "",
      priority: null,
      whichSection: "",
    },
  });

  async function onSubmit(values: ReportValidationType) {
    //perform an action related to this later
    //assign priority according to enum related to value
    console.log(values);
  }

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger ref={ref} />
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-11/12 mx-auto sm:max-w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>Report Bugs</DialogTitle>
          <DialogDescription>
            If you face any bugs while using the website, please take sometime
            and report them
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what type of bug you are facing!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whichSection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which Section</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the url of the page in which you are facing issue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bug Priority</FormLabel>
                    <Select
                      onValueChange={
                        (value: string) => field.onChange(Number(value)) // Convert string to enum number
                      }
                      value={
                        field.value !== undefined
                          ? field.value?.toString()
                          : undefined
                      } // Handle undefined values
                      defaultValue={
                        field.value !== undefined
                          ? field.value?.toString()
                          : undefined
                      } // Handle default value conversion
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Priority of Bug" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={BugPriority.Low.toString()}>
                          Low
                        </SelectItem>
                        <SelectItem value={BugPriority.Medium.toString()}>
                          Medium
                        </SelectItem>
                        <SelectItem value={BugPriority.High.toString()}>
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={() => {
                    form.reset();
                    setOpenState(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ReportDialog;
