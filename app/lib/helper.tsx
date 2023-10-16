import { NextResponse } from "next/server";
import { ZodError } from "zod";

type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function test(): string { 
    return "test"
}

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const generatePassword = (noOfSpecialCharacter: number) => {
        const specialCharacterList = '!@#$%&*'.split('');
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const noOfChars = noOfSpecialCharacter ? 4 : 5
      const passChars : String[] = [];
        for (let k = 0; k < noOfChars; k++) {
            const idx = Math.floor(Math.random() * lowerCaseChars.length)
            passChars.push(lowerCaseChars[idx]);
            passChars.push(upperCaseChars[idx]);
        }
        if (noOfSpecialCharacter && noOfSpecialCharacter > 0) {
            for (let j = 0; j < noOfSpecialCharacter; j++) {
                const idx = Math.floor(Math.random() * specialCharacterList.length)
                passChars.push(specialCharacterList[idx])
            }
        }
        for (let i = passChars.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            const temp = passChars[i];
            passChars[i] = passChars[swapIndex];
            passChars[swapIndex] = temp;
        };
        return passChars.join('');
}
    
export function hexToRgbA(hex,opacity = 1) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
  }
  throw new Error('Bad Hex');
}