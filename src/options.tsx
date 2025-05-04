import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Storage } from "@plasmohq/storage";

import "~styles/globals.css";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Toaster } from "@/src/components/ui/toaster";
import { Loader2 } from "lucide-react";

import { toast } from "~hooks/use-toast";
import { optionsSchema, type Options } from "~schema/options-schema";

const storage = new Storage();

const OptionsIndex = () => {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<Options>({
    resolver: zodResolver(optionsSchema),
    defaultValues: {
      favoriteAccounts: "",
      primaryButtonRegEx: "",
      cautionCardRegEx: "",
      infoCardRegEx: "",
      removeFromAccountLabelRegEx: "",
      removeFromButtonLabelRegEx: "",
      gridColumns: "2",
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await storage.get<Options>("options");
      if (settings) {
        form.reset(settings);
      }
    };
    loadSettings();
  }, [form]);

  const handleSave = async (values: Options) => {
    setIsSaving(true);
    try {
      // Ensure gridColumns is always a string
      const updatedValues = {
        ...values,
        gridColumns: values.gridColumns || "2",
      };
      await storage.set("options", updatedValues);
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully saved.",
      });
    } catch (e) {
      toast({
        title: "Failed to save settings",
        description: "An error occurred while saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-5 font-sans text-base">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="gridColumns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grid Columns</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="2" {...field} />
                      </FormControl>
                      <FormDescription>Set the number of columns for the grid.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favoriteAccounts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favorite Accounts</FormLabel>
                      <FormControl>
                        <Input placeholder="0123456789,0123456789" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the Account IDs of your favorite accounts, separated by commas. These accounts will be
                        pinned for quick access.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryButtonRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Buttons</FormLabel>
                      <FormControl>
                        <Input placeholder="/Admin|Billing|Editor/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Button labels matching this regular expression will be styled as primary buttons to highlight
                        important actions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cautionCardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caution Cards</FormLabel>
                      <FormControl>
                        <Input placeholder="/production/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be marked as caution cards, ideal for
                        highlighting production environments or accounts requiring extra attention.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="infoCardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Info Cards</FormLabel>
                      <FormControl>
                        <Input placeholder="/delivery/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted as info cards for special
                        significance.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="removeFromAccountLabelRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remove Repetitive Account Label Text</FormLabel>
                      <FormControl>
                        <Input placeholder="/^myCompanyName-/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Text matching this regular expression will be removed from account labels to eliminate
                        repetitive prefixes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="removeFromButtonLabelRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remove Repetitive Button Label Text</FormLabel>
                      <FormControl>
                        <Input placeholder="/^myCompanyName-/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Text matching this regular expression will be removed from button labels to eliminate repetitive
                        prefixes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Options"
                  )}
                </Button>
              </form>
            </Form>
            <Toaster />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OptionsIndex;
