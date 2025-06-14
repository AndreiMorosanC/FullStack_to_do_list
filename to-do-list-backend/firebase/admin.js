import admin from "firebase-admin"
import {readFileSync} from "fs"

const serviceAccount = JSON.parse(
    readFileSync(new URL("../study-base-d2309-firebase-adminsdk-fbsvc-0c9a787974.json", import.meta.url))
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
