import React from 'react';

import useSWR from 'swr';

import { Showcase } from '@site/src/utils/apiTypes';
import { User } from '@site/src/utils/github';
import { fetcher } from '@site/src/utils/swr';

interface NetworkProps {
  id: string;
}

export const Network = ({ id }: NetworkProps): JSX.Element => {
  const { data, error } = useSWR<Showcase>(
    `http://localhost:4000/showcase/${id}`,
    fetcher
  );

  const githubData = useSWR<User>(
    `https://api.github.com/users/${data?.author?.githubUsername}`,
    fetcher
  ).data;

  return data && !error ? (
    <div className="container">
      <h1>{data.title}</h1>
      <p>{data.summary}</p>
      {githubData && (
        <div className="avatar">
          <img
            src={githubData.avatar_url}
            alt={githubData.name}
            className="avatar__photo"
          />
          <div className="avatar__intro">
            <div className="avatar__name">{githubData.name}</div>
            <div className="avatar__subtitle">{githubData.bio}</div>
          </div>
        </div>
      )}
      <div className="markdown">{data.body}</div>

      <div
        className="card"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "900px",
        }}
      >
        <div
          className="card__header"
          style={{
            margin: "8px",
          }}
        >
          <h2>Bill of Materials</h2>
        </div>
        <div className="card__body">
          {data.materials?.map((material, index) => (
            <div
              key={index}
              style={{
                borderTop: "2px solid gray",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  display: "flex",
                }}
              >
                <img
                  src={material.image}
                  height="auto"
                  width="100%"
                  style={{
                    margin: "auto",
                    padding: "4px",
                    display: "block",
                    maxWidth: "60px",
                    maxHeight: "60px",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className="avatar__intro">
                <div className="avatar__name">{material.name}</div>
                <small className="avatar__subtitle">{material.details}</small>
              </div>
              <a
                target="_blank"
                href={material.url}
                className="button button--outline button--secondary"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Network not found</h1>
    </div>
  );
};
