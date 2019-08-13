import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./Main.css";
import logo from "../../assets/logo.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";

function Main({ match }) {
  const [users, setUsers] = useState([]);

  const { id: user } = match.params;

  useEffect(() => {
    api
      .get("/devs", {
        headers: {
          user
        }
      })
      .then(({ data }) => setUsers(data))
      .catch(err => console.log(err));
  }, [user]);

  async function handleDislike(id) {
    await api.post(`devs/${id}/dislikes`, null, {
      headers: {
        user
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleLike(id) {
    await api.post(`devs/${id}/likes`, null, {
      headers: {
        user
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev Logo" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="avatar" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Botão Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Botão like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
    </div>
  );
}

export default Main;
