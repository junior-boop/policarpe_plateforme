'use client'
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { AddProjectFormSchema } from "@/app/api/lib/definitions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SvgSpinners3DotsFade } from "../icons";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context/globalcontext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Textarea } from "../ui/textarea";

import hljs from 'highlight.js'
import js from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', js)

import { User } from "@prisma/client";
import { FirebaseKeyProps } from "@/types/general";
import { Checkbox } from "../ui/checkbox";

export default function AddProject() {
    const [click, setClick] = useState(false)
    const { addProjectPanel } = useGlobalContext()
    const [membres, setMembres] = useState<User[]>([])
    const [highlighter, sethighlighter] = useState(false)
    const [firebaseConfigValue, setfirebaseConfig] = useState<string>('')
    const [valuecode, setvaluecode] = useState('')
    const [AllMember, setAllMember] = useState<{ userId: string, userName: string, userRole: string }[]>([])
    const code = useRef<any>()

    const form = useForm<z.infer<typeof AddProjectFormSchema>>({
        resolver: zodResolver(AddProjectFormSchema),
        defaultValues: {
            name: "",
            description: '',
            userId: [],
            firebaseConfig: ""
        },
    })

    useEffect(() => {
        async function AllMember() {

            const res = await fetch('/api/users')
            const resultat = await res.json()
            setMembres(resultat)
        }

        AllMember()
    }, [])


    useEffect(() => {
        const highlightedCode = hljs.highlight(firebaseConfigValue, { language: 'javascript' }).value
        setvaluecode(highlightedCode)
        hljs.highlightElement(code.current as HTMLElement)
    }, [firebaseConfigValue])

    const handlecloseBtn = () => {
        addProjectPanel.setAddProjectPanelOpen(!addProjectPanel.addProjectPanelOpen)
    }

    // // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AddProjectFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setClick(true)
        const bodyContent = new FormData()

        const arr: string[] = []
        const obj: any = {}
        const firebasesconfigstring = values.firebaseConfig.substring(1, values.firebaseConfig.length - 1).replace(/(\s+|\n+)/gi, '').split(',')
        firebasesconfigstring.forEach(el => {
            el.split(/:"/gi).forEach(ele => {
                arr.push(ele.replace('"', ''))
            })
        })
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 1) {
                obj[arr[i - 1]] = arr[i]
            }
        }

        bodyContent.append("name", values.name)
        bodyContent.append("description", values.description)
        bodyContent.append("userId", JSON.stringify(values.userId))
        bodyContent.append("firebaseConfig", JSON.stringify(obj))

        const res = await fetch('/api/projets', {
            method: 'POST',
            body: bodyContent
        })

        if (!res.ok) {
            throw new Error('il y a une erreur de serveur')
        } else {
            const data = await res.json()
            if (data.status === 'completed') {
                addProjectPanel.setAddProjectPanelOpen(!addProjectPanel.addProjectPanelOpen)
            }

            if (data.status === 'failed') {

            }
        }
    }


    const handleCode = () => {
        sethighlighter(true)
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
                                    <FormLabel>Nom du Projet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="site e-commerce" {...field} />
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
                                    <FormLabel>Descrption du Projet</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Faites une petite description de votre projet"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firebaseConfig"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FirebaseConfig :</FormLabel>
                                    <FormControl>
                                        <div className="relative h-auto">
                                            <div ref={code} className={`code h-[200px] bg-slate-800 rounded-md p-3 ${highlighter ? "block" : 'hidden'}`} dangerouslySetInnerHTML={{ __html: valuecode }}></div>
                                            <div className={`overflow-hidden ${highlighter ? 'h-0' : 'h-[200px]'}`}>
                                                <textarea
                                                    // value={firebaseConfigValue}
                                                    placeholder="Inserer la valeur de la variable firebaseConfig"
                                                    className="resize-none h-[200px] w-full p-3 border rounded-lg text-sm text-slate-700 block"
                                                    // @ts-ignore
                                                    onInput={({ target }) => setfirebaseConfig(target.value)}
                                                    {...field}
                                                />

                                                <button type="button" onClick={handleCode} className={`absolute bottom-3 bg-slate-800 text-white right-3 px-6 py-2 text-sm font-semibold rounded-md ${highlighter ? 'hidden' : 'inline-block'}`}> Valider</button>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Membres</FormLabel>
                                    <div>
                                        {AllMember.map(el => (<div key={el.userId} className="member flex gap-2 p-2 border rounded-md">
                                            <div className="w-10 h-10 aspect-square rounded-full bg-slate-200 flex items-center justify-center font-bold">{el.userName[0]}</div>
                                            <div>
                                                <div className="text-sm font-bold">{el.userName}</div>
                                                <div className=" text-sm font-semibold text-gray-600">{el.userId}</div>
                                                <div className=" text-sm font-semibold text-gray-600">{el.userRole}</div>
                                            </div>
                                        </div>))}
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={'outline'} role="combobox" className={cn("w-full justify-between",
                                                    !field.value && 'text-muted-foreground'
                                                )}>
                                                    Ajouter un Membre
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {membres.map((membre) => (
                                                            <CommandItem >
                                                                <label htmlFor={membre.Id} className=" flex gap-2 w-full items-center">
                                                                    <Checkbox
                                                                        id={membre.Id}
                                                                        value={membre.Id}
                                                                        key={membre.Id}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                const check = AllMember.filter(el => el.userId === membre.Id).length > 0 ? true : false
                                                                                if (!check) {
                                                                                    setAllMember([...AllMember, { userId: membre.Id, userName: membre.name, userRole: membre.role }])
                                                                                }
                                                                            } else {
                                                                                setAllMember(AllMember.filter((el) => el.userId !== membre.Id))
                                                                            }
                                                                            return checked
                                                                                ? field.onChange([...field.value, { userId: membre.Id, userName: membre.name, userRole: membre.role }])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value.userId !== membre.Id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                    <div className="flex-1 border">
                                                                        <div className="font-semibold text-base">{membre.name}</div>
                                                                    </div>
                                                                </label>

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