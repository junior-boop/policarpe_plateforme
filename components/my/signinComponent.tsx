"use client"

import { SigninFormSchema, FormSignInState } from "@/app/api/lib/definitions"
// import { useActionState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createSession } from "@/lib/session"
import { SvgSpinners3DotsFade } from "../icons"
import { useState } from "react"
import encodeBase64 from "@/lib/hash"



export default function SignInComponent() {
    const router = useRouter()
    const [click, setClick] = useState(false)
    const [checkPW, setCheckPW] = useState(false)
    const [checkMail, setCheckMail] = useState(false)

    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setClick(true)

        const bodyContent = new FormData()
        bodyContent.append('email', values.email)

        const res = await fetch('/api/auteur/getAuteur', {
            method: "POST",
            body: bodyContent
        })

        if (!res.ok) {
            throw new Error('il y a une erreur de serveur')
        } else {
            const data = await res.json()
            if (data.state === 'completed') {
                const auteur = data.data

                if (!auteur.hasOwnProperty('ID')) {
                    setCheckPW(true)
                    setClick(false)
                } else {
                    const passwordHash = encodeBase64(values.password)
                    const checkPassWord = auteur.password === passwordHash

                    if (!checkPassWord) {
                        setCheckPW(true)
                        setClick(false)
                    } else {
                        // createSession(filter.ID)
                        router.push(`/dashboard/user_${auteur.ID}`)
                    }
                }



            }
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="example@example.xyz" {...field} />
                            </FormControl>
                            {
                                checkPW && (<FormMessage>
                                    L{"'"}addresse e-mail est Incorrect
                                </FormMessage>)
                            }
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
                            {
                                checkPW && (<FormMessage>
                                    Le mot de passe est Incorrect
                                </FormMessage>)
                            }
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