"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { loginServices, perfilUsuario } from "@/services/auth/auth.services";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function LoginForm({ className }: { className?: string }) {
  const schemaLogin = z.object({
    username: z
      .string({
        required_error: "El usuario es obligatorio",
      })
      .min(1, "El usuario es obligatorio"),
    password: z.string().min(3, "La contraseña debe tener al menos 6 caracteres"),
  });
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof schemaLogin>) => {
    try {
      const res = await loginServices(data);
      Cookies.set("access_token", res.access, { secure: process.env.NODE_ENV === "production", sameSite: "Lax" });
      Cookies.set("refresh_token", res.refresh, { secure: process.env.NODE_ENV === "production", sameSite: "Lax" });
      const perfil = await perfilUsuario();
      toast.success(
        `Bienvenido ${perfil.usuario.nombre_completo.length <= 0 ? perfil.usuario.username : perfil.usuario.nombre_completo}!`
      );
      router.push("/panel");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-balance text-sm text-muted-foreground">Ingresa tu usuario para iniciar sesión</p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="flex items-center">
                    <span>Contraseña</span>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Iniciar sesión
          </Button>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">O continuar con</span>
          </div>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Iniciar sesión con GitHub
          </Button> */}
        </div>
        {/* <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/sign-up" className="underline underline-offset-4">
            Registrate
          </Link>
        </div> */}
      </form>
    </Form>
  );
}
