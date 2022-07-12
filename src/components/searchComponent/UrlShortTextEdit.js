import {React, useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "reactstrap";

import './UrlShotTextEdit.css'

const UrlShortTextEdit = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [qrUrl, setQr] = useState("");

    const baseURL = "https://sheltered-everglades-08560.herokuapp.com"

    function validURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const openInNewTab = (url = shortUrl) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const fetchImage = async (imageUrl) => {
        console.log(imageUrl)
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setQr(imageObjectURL);
    };

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            if (validURL(longUrl)) {
                axios.get(baseURL + "/short?longUrl=" + longUrl).then(response => {
                    var respUrl = response.data.shortUrl.toString()
                    setShortUrl(respUrl)
                    console.log(response.data)
                    fetchImage(response.data.qrUrl)
                })
            } else {
                setShortUrl("")
                console.log("DO NOTHING")
            }

        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [longUrl])

    return (
        <div>
            <div className="form-floating mb-3">
                <input autoFocus type='text' autoComplete='off' className="form-control live-search-field"
                       onChange={(e) => setLongUrl(e.target.value)}
                       id="floatingInput"/>
                <label className={"label-text"} htmlFor="floatingInput">Enter Long URL</label>
            </div>
            <Button className={"btn btn-submit btn-animated"}
                    onClick={() => setLongUrl(document.getElementById('floatingInput').value)}>Make Short</Button>
            {
                shortUrl !== "" &&
                <div className="card card-custom">
                    <img className="card-img-top image"
                         src={qrUrl}
                         onClick={() => openInNewTab()}
                         alt="Card image cap"/>
                    <div className="card-body">
                        <Button className="btn btn-effect" onClick={() => openInNewTab()}>Go to
                            Site</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UrlShortTextEdit;