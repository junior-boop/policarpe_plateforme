"use client"

import { SignupFormSchema, FormState } from "@/app/api/lib/definitions"
// import { useActionState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { SvgSpinners3DotsFade } from "../icons"
import { useState } from "react"



export default function SignUpComponent() {
    const router = useRouter()
    const [click, setClick] = useState(false)


    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            surname: "",
            tel: "",
            email: "",
            password: "",
            socialNetwork: ""
        },
    })

    // // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setClick(true)
        const bodyContent = new FormData()

        for (let value in values) {
            //@ts-ignore
            bodyContent.append(value, values[value])
        }

        const res = await fetch('/api/auteur', {
            method: 'POST',
            body: bodyContent
        })


        if (!res.ok) {
            throw new Error('il y a une erreur de serveur')
        } else {
            const data = await res.json()
            if (data.state === 'completed') {
                const auteur = data.data
                router.push(`/dashboard/user_${auteur.ID}`)
            }
        }

    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Prenom</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
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
                    name="tel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+237655777888" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="socialNetwork"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                                <Input placeholder="@daniel.seppoeke" {...field} />
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
                                <Input type="password" placeholder="example@example.xyz" {...field} />
                            </FormControl>
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
    )
}