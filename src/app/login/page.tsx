"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { NextPage } from "next";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";

const schemaValidation = zod.object({
    email: zod.string().min(1, { message: "Email required" }).email({ message: "Invalid email" }),
    password: zod.string().min(1, { message: "Password required" }),
})
type FormData = zod.infer<typeof schemaValidation>

const LoginPage: NextPage = (): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [loadingGoogle,setLoadingGoogle] = useState(false)
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schemaValidation)
    })

    const handleSign: SubmitHandler<FormData> = async (data) => {
        try {
            setLoading(true)
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
                callbackUrl: "/",
            });
            setLoading(false)
            if (res && !res.error) {
                router.push("/");
            } else {
                console.log(res?.error);
                toast({
                    title: "Failed",
                    variant: "destructive",
                    description: res?.error,
                    className: "bg-red-500 text-white px-3 py-3",
                })
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    };

    const signWithGoogle = async ()=> {
        try {
            setLoadingGoogle(true)
            await signIn('google', { callbackUrl: '/' })
            setLoadingGoogle(false)
        } catch (error) {
            setLoadingGoogle(false)
            console.log(error);   
        }
    }


    return (
        <div className="gradient-bg-sidebar h-screen flex justify-center items-center">
            <div className="bg-white w-[400px] rounded-md  px-5 py-10">
                <h1 className="text-2xl text-center">LOGIN</h1>


                <div className="mt-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSign)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Masukan email" {...field} />
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
                                        <FormControl>
                                            <Input type="password" placeholder="Masukan password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-5" type="submit" > {loading ? <Loader2 className="animate-spin" /> : "Sign"}</Button>
                        </form>
                    </Form>
                </div>



                <Button variant={"outline"} className="w-full mt-10" onClick={signWithGoogle}>{loadingGoogle ? <Loader2 className="animate-spin" /> : "Sign With Google"}</Button>
            </div>
        </div>
    )
}

export default LoginPage