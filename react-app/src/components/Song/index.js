import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./Song.css";

function Song() {
    const [song, setSong] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/api/songs')
            .then(res => res.json())
            .then(data => {
                const songArr = data.Songs;
                setSong(data)
            })
    })
    return (
        <> </>
    )
}
