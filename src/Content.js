import React from 'react';
import {app} from './tests'

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
        var temp_imgs = [];
        app.database().ref().on('child_added', (snap)=>{
            var imgs = snap.val();
            console.log(imgs);
            for(var key in imgs){
                temp_imgs.push(imgs[key]);
            }
            this.setState({images: temp_imgs});
        });

        
    }

    render() {
        return (
            <div className="page-content">
                <div className="mdl-grid" style={{ maxWidth: 1000 }}>
                    {this.state.images.map((url, index) =>
                        <div className="mdl-cell mdl-cell--4-col mdl-cell--4-col-phone" key={index}>
                            <div className="demo-card-image mdl-card mdl-shadow--2dp" style={{ background: `url(${url}) center / cover` }}>
                                <div className="mdl-card__title mdl-card--expand">
                                </div>
                                <div className="mdl-card__actions">
                                    <span className="demo-card-image__filename">Image.jpg</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Content;