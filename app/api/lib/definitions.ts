import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "votre nom doit contenir au minimum 04 caractères" })
    .trim(),
  surname: z
    .string()
    .min(4, { message: "votre prenom doit contenir au minimum 04 caractères" })
    .trim(),
  email: z
    .string()
    .email({
      message: "Svp, entrez un addresse email valide",
    })
    .trim(),
  tel: z
    .string()
    .min(1, "Le numéro de téléphone doit contenir au moins 1 caractère")
    .max(20, "Le numéro de téléphone ne peut pas dépasser 20 caractères")
    .regex(
      /^\+?\d+$/,
      'Le numéro de téléphone doit contenir uniquement des chiffres, avec un préfixe "+" facultatif'
    ),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moin 08 caratères",
    })
    .regex(/[a-zA-Z]/, {
      message: "Votre mot de passe doit contenir au moin une lettre",
    })
    .regex(/[0-9]/, {
      message: "Votre mot de passe doit contenir au moin un chiffre",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Votre mot de passe doit contenir au moin un caractère spécial",
    })
    .trim(),
  socialNetwork: z
    .string()
    .min(1, "Le pseudo Facebook doit contenir au moins 1 caractère")
    .max(50, "Le pseudo Facebook ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      "Le pseudo Facebook ne peut contenir que des lettres, des chiffres, des underscores et des points"
    ),
});

export const AddUserFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "votre nom doit contenir au minimum 04 caractères" })
    .trim(),
  email: z
    .string()
    .email({
      message: "Svp, entrez un addresse email valide",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moin 08 caratères",
    })
    .regex(/[a-zA-Z]/, {
      message: "Votre mot de passe doit contenir au moin une lettre",
    })
    .regex(/[0-9]/, {
      message: "Votre mot de passe doit contenir au moin un chiffre",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Votre mot de passe doit contenir au moin un caractère spécial",
    })
    .trim(),
});

const user = z.object({
  userId: z.string().trim(),
  userName: z.string().trim(),
  userRole: z.string().trim(),
});

export const AddProjectFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "votre nom doit contenir au minimum 04 caractères" })
    .trim(),
  description: z
    .string()
    .min(12, {
      message: "la description doit contenir au minimum 12 caractères",
    })
    .trim(),
  firebaseConfig: z
    .string()
    .min(12, {
      message: "entrer uniquement la valeur de la variable firebaseConfig ",
    })
    .trim(),
  userId: z.array(user),
});

export const SigninFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Svp, entrez un addresse email valide",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moin 08 caratères",
    })
    .regex(/[a-zA-Z]/, {
      message: "Votre mot de passe doit contenir au moin une lettre",
    })
    .regex(/[0-9]/, {
      message: "Votre mot de passe doit contenir au moin un chiffre",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Votre mot de passe doit contenir au moin un caractère spécial",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type FormSignInState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type AddUserFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export type AddProjectFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        userId?: string[];
        firebaseConfig?: string[];
      };
      message?: string;
    }
  | undefined;
