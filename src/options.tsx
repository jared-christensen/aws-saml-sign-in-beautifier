import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
import { Loader2, Plus, X } from "lucide-react";

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
      color1CardRegEx: "",
      color2CardRegEx: "",
      color3CardRegEx: "",
      removeFromAccountLabelRegEx: "",
      removeFromButtonLabelRegEx: "",
      gridColumns: "2",
      groups: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "groups",
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormDescription>
                  Organize accounts into named sections. Accounts are matched by regex pattern and appear in the first matching group.
                </FormDescription>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start p-4 border rounded-lg">
                    <div className="flex-1 space-y-4">
                      <FormField
                        control={form.control}
                        name={`groups.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Production" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`groups.${index}.regEx`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regex Pattern</FormLabel>
                            <FormControl>
                              <Input placeholder="/prod|production/i" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="mt-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", regEx: "" })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Group
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="cautionCardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: '#e07941' }}></span>
                        Orange
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="/production/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted with an orange color.
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
                      <FormLabel className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: '#688ae8' }}></span>
                        Blue
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="/delivery/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted with a blue color.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color1CardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: '#c33d69' }}></span>
                        Pink
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="/dev|development/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted with a pink color.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color2CardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: '#2ea597' }}></span>
                        Teal
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="/staging|stage/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted with a teal color.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color3CardRegEx"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: '#8456ce' }}></span>
                        Purple
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="/prod|production/i" {...field} />
                      </FormControl>
                      <FormDescription>
                        Account names matching this regular expression will be highlighted with a purple color.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Label Cleanup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>

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
      </div>
    </div>
  );
};

export default OptionsIndex;
