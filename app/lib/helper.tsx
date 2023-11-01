import axios from "axios";
import { get } from "lodash";
import { NextResponse } from "next/server";
import { Cookies } from "react-cookie";
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
  const passChars: String[] = [];
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

export function hexToRgbA(hex: string, opacity = 1) {
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

export function mapDataByCol(data: any[], columnMap: any[], userRole: string, isMobile: boolean) {
  console.log("columnMap", columnMap)
  const action = ["edit", "delete", "more", "view"]
  return data.map((entries, index) => {
    return {
      data: [
        ...(columnMap.filter((mapItem) => { return !action.includes(mapItem.name) }).map((mapItem, index) => {

          return get(entries, mapItem.objPath)
        }))
      ],
      ...(!isMobile ? {
        edit: userRole == "SuperAdmin" || userRole == "Admin",
        delete: userRole == "SuperAdmin",
        view: userRole == "Client"
      } : {}),
      ...(isMobile ? {
        more: userRole == "SuperAdmin" || userRole == "Admin",
        test: true,
      } : {})
    }
  })
}

export async function clientGetDisplayID(token, collection) {
  return await axios.get(`/api/query/genDisplayID/${collection}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(({ data }) => data.result)
}

export const handleDeleteS3 = async (oldAttachment, token) => {
  // const data = new FormData()
  const data = {
    type: oldAttachment.type,
    collection: oldAttachment.tableName,
    idWithFilenameLists: [`${oldAttachment.attachmentDisplayID}/${oldAttachment.name}`]
  }
  // data.set("type", oldAttachment.type)
  // data.set("collection", "masterProduct")
  // data.set("idWithFilenameLists", JSON.stringify([`${oldAttachment.attachmentDisplayID}/${oldAttachment.name}`]))
  // console.log(":handleUpdates3", data, attachment, attachmentRecord)
  await axios.delete('/api/aws/s3',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': `multipart/form-data`
      },
      data
    }
  ).then((subResult) => {
    console.log("result", subResult)
  }).catch((err) => {
    console.log("error api", err)
  })
}