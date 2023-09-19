import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyAP80ChIMqwlHEs7jMh7ep4XR65SFQTIyM',
  authDomain: 'pentashop-c4175.firebaseapp.com',
  projectId: 'pentashop-c4175',
  storageBucket: 'pentashop-c4175.appspot.com',
  messagingSenderId: '890585529174',
  appId: '1:890585529174:web:7b1f8a72876d2150ac34f7',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
