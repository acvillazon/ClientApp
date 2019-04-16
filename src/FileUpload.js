import React from 'react'
import {app} from './tests'
import firebase from 'firebase'

const messaging = app.messaging();

class FileUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: ""
        };

        this.onChange = this.onChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount() {
        messaging.usePublicVapidKey("BJP4WaLX9cMD13m4b-A4nktTaKDHBLIcAqEY2UU2U_1BmGDQAPrhGw4-UBglfLZPcxrLKBMiJfo6x_trTPFvIq8");
        messaging.requestPermission()
            .then(() => {
                alert('Notification permission granted!');
                // Get Instance ID token. Initially this makes a network call, once retrieved
                // subsequent calls to getToken will return from cache.
                messaging.getToken().then(function (currentToken) {
                    if (currentToken) {
                        alert(`Token: \n ${currentToken}`);
                        console.log('Token: ', currentToken);
                    } else {
                        // Show permission request.
                        alert('No Instance ID token available. Request permission to generate one.');
                        // Show permission UI.

                    }
                }).catch(function (err) {
                    alert(`An error occurred while retrieving token. ${err}`);
                });
            })
            .catch((err) => {
                alert(`Unable to get permission to notify ${err}`)
            });

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function () {
            messaging.getToken().then(function (refreshedToken) {
                alert(`Token refreshed. ${refreshedToken}`);
                // Indicate that the new Instance ID token has not yet been sent to the
                // app server.

                // Send Instance ID token to app server.
                // ...
            }).catch(function (err) {
                alert(`Unable to retrieve refreshed token ${err}`);
            });
        });

        messaging.onMessage(function (payload) {
            console.log('Message received. ', payload.data.new_image_url);
            // ...
            alert(`Message received: ${payload.data.new_image_url}`);
        });
    }

    onChange(e) {
        this.setState({ fileName: e.target.files[0].name });
    }

    uploadFile(e) {
        var file = document.getElementById('uploadBtn').files[0];
        if (file !== undefined) {
            app.storage().ref('images').child(file.name).put(file).on(
                firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                    var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log(percent + "% done");
                },
                null,
                (snapshot) => { alert('File successfully uploaded!') });
        } else {
            alert('Selecciona un archivo!');
        }

    }


    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                    <button id="upload-button" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-buton--raised" onClick={this.uploadFile}>
                        Upload
                    </button>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                        <input className="mdl-textfield__input" placeholder="File" value={this.state.fileName} type="text" id="uploadFile" readOnly />
                        <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                            <i id="upload-file-icon" className="material-icons">attach_file</i><input type="file" id="uploadBtn" onChange={this.onChange} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default FileUpload;
