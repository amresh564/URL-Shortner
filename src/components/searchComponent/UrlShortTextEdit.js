import {React, useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "reactstrap";

import './UrlShotTextEdit.css'

const UrlShortTextEdit = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

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
        console.log(url)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            console.log(longUrl)

            if (validURL(longUrl)) {
                axios.get(baseURL + "/short?longUrl=" + longUrl).then(response => {
                    var respUrl = response.data.shortUrl.toString()
                    setShortUrl(respUrl)
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
                       id="floatingInput" placeholder="SomeWebsite.com"/>
                <label className={"label-text"} htmlFor="floatingInput">Enter Long URL</label>
            </div>
            <Button>Make Short</Button>

            {
                shortUrl !== "" &&
                <div className="card card-custom">
                    <img className="card-img-top"
                         src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?20200615212723"
                         alt="Card image cap"/>
                    <div className="card-body">
                        <Button className={"button-link"} onClick={() => openInNewTab()}>Go to
                            Site</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UrlShortTextEdit;