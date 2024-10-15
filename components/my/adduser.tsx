'use client'
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { AddUserFormSchema } from "@/app/api/lib/definitions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SvgSpinners3DotsFade } from "../icons";
import { useState } from "react";
import { useGlobalContext } from "@/context/globalcontext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command";

export default function AddUser() {
    const [click, setClick] = useState(false)
    const { addUserPanel } = useGlobalContext()

    const roles = [
        { label: "Administrateur", value: "admin" },
        { label: "Éditeur", value: "editor" },
    ]

    const form = useForm<z.infer<typeof AddUserFormSchema>>({
        resolver: zodResolver(AddUserFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    const handlecloseBtn = () => {
        addUserPanel.setVisibility(!addUserPanel.visibility)
    }

    // // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AddUserFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setClick(true)
        const bodyContent = new FormData()

        for (let value in values) {
            //@ts-ignore
            bodyContent.append(value, values[value])
        }

        const res = await fetch('/api/users/adduser', {
            method: 'POST',
            body: bodyContent
        })


        if (!res.ok) {
            throw new Error('il y a une erreur de serveur')
        } else {
            const data = await res.json()
            if (data.state === 'completed') {
                addUserPanel.setVisibility(!addUserPanel.visibility)
            }
        }

    }
    return (
        <div className="fixed right-0 top-0 w-[25%] bg-white h-[100vh] border-l py-2 shadow">
            <div className="h-[52px] flex items-center px-6 font-semibold justify-between">
                <span className="text-xl">Ajouter un utilisateur</span>
                <Button onClick={handlecloseBtn} variant={'ghost'} className=" w-[42px] aspect-square px-0 py-0 flex items-center justify-center rounded-full">
                    <X className="w-6 h-6" />
                </Button>
            </div>
            <div className=" px-6 py-6">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Nom et Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
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
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@example.xyz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de Passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="xxxxxxx" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rôle</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={'outline'} role="combobox" className={cn("w-full justify-between",
                                                    !field.value && 'text-muted-foreground'
                                                )}>
                                                    {field.value
                                                        ? roles.find(role => role.value === field.value)?.label
                                                        : "Selectionnez un Rôle"
                                                    }
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandEmpty>Aucune Rôle attribuer</CommandEmpty>
                                                    <CommandGroup>
                                                        {roles.map((role) => (
                                                            <CommandItem
                                                                value={role.value}
                                                                key={role.value}
                                                                onSelect={() => {
                                                                    form.setValue('role', role.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn('mr-2 h-4 w-4',
                                                                        role.value === field.value
                                                                            ? 'opacity-100'
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {role.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={click ? true : false} className="w-full" type="submit">
                            <div className="w-10 h-10"></div>
                            Valider
                            <div className="w-10 h-10 flex items-center justify-center">
                                {click && <SvgSpinners3DotsFade className="w-10" />}
                            </div>
                        </Button>

                    </form>
                </Form>
            </div>
        </div>
    )
}