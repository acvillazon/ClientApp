import firebase from 'firebase'

    const config = {
        apiKey: "AIzaSyBnWfRAy23f8zJ3614T_RwxIW53Czipek8",
        authDomain: "fir-movil-224dc.firebaseapp.com",
        databaseURL: "https://fir-movil-224dc.firebaseio.com",
        projectId: "fir-movil-224dc",
        storageBucket: "fir-movil-224dc.appspot.com",
        messagingSenderId: "53387248144"
    };

export const app = firebase.initializeApp(config);
