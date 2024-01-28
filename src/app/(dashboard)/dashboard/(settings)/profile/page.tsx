'use client';

import { useState } from 'react';

import { useUser } from '@/contexts/UserContext';

import { toast } from 'sonner';

import ProfilePictureUpload from '@/components/profilePicturePicker';
import DatePicker from '@/components/datePicker';
import LoadingIndicator from '@/components/loadingIndicator';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Profile() {
  const {
    user,
    setEmail,
    setFirstName,
    setLastName,
    setBirthDate,
    setWebsite,
  } = useUser();

  const formSchema = z.object({
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .trim()
      .min(2, { message: 'First name should be at least 2 characters long' }),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .trim()
      .min(2, { message: 'Last name should be at least 2 characters long' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    birthDate: z.date().optional(),
    website: z.string().trim().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      email: user?.email ?? undefined,
      birthDate: user?.birthDate ?? undefined,
      website: user?.website ?? undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.firstName !== user?.firstName) {
        setFirstName(values.firstName);
      }

      if (values.lastName !== user?.lastName) {
        setLastName(values.lastName);
      }

      if (values.email !== user?.email) {
        setEmail(values.email);
      }

      if (values.birthDate && values.birthDate !== user?.birthDate) {
        setBirthDate(values.birthDate);
      }

      if (values.website && values.website !== user?.website) {
        setWebsite(values.website);
      }

      values.email !== user?.email
        ? toast('Please check your inbox to confirm change of email')
        : toast('Successfully saved changes');
    } catch (error) {
      console.log(error);
      toast('Something went wrong saving the changes');
    }
  };

  return (
    <main>
      <div className="flex flex-col space-y-4 content-start">
        <ProfilePictureUpload />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="space-y-2 max-w-xs"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      defaultValue={user?.firstName ?? ''}
                      type="text"
                      autoCapitalize="words"
                      autoComplete="given-name"
                      autoCorrect="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      defaultValue={user?.lastName ?? ''}
                      type="text"
                      autoCapitalize="words"
                      autoComplete="family-name"
                      autoCorrect="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      defaultValue={user?.email ?? ''}
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      initialDate={
                        user?.birthDate ? user?.birthDate : undefined
                      }
                      fromYear={1900}
                      toYear={2024}
                      {...field}
                      handleDateChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      id="website"
                      defaultValue={user?.website ?? ''}
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
