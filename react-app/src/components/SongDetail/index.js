import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "./OpenModalButton";
import DeleteComment from "./DeleteComment";
import CreateComment from "./CreateComment";


import * as SongActions from "../../store/songs";
import * as CommentActions from "../../store/comments";
import * as PlaylistActions from "../../store/playlists";

import "./SongDetail.css";

const SongDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef(null);
    const { closeModal } = useModal();

    const currentSong = useSelector((state) => (state.songs.songs.Songs));
    const currentComments = useSelector((state) => (state.comments.comments.Comments));

    const { songId } = useParams();

    
}
