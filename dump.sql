--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: postsHashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."postsHashtags" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."postsHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."postsHashtags_id_seq" OWNED BY public."postsHashtags".id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username character varying(50) NOT NULL,
    picture text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: postsHashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags" ALTER COLUMN id SET DEFAULT nextval('public."postsHashtags_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (17, 2, 4, '2023-01-07 13:48:48.00305');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 1, 1, 'Github', '2023-01-06 21:27:30.310239');
INSERT INTO public.posts VALUES (2, 1, 1, 'a', '2023-01-06 22:12:55.669162');
INSERT INTO public.posts VALUES (3, 2, 1, 'to dev(endo)', '2023-01-06 22:21:58.70501');
INSERT INTO public.posts VALUES (4, 2, 1, 's', '2023-01-06 22:24:09.639923');


--
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '2023-01-06 21:03:18.692812');
INSERT INTO public.sessions VALUES (2, 1, '2023-01-06 21:13:31.3624');
INSERT INTO public.sessions VALUES (3, 1, '2023-01-06 21:19:00.639425');
INSERT INTO public.sessions VALUES (4, 1, '2023-01-06 21:22:15.190936');
INSERT INTO public.sessions VALUES (5, 1, '2023-01-06 21:25:33.067707');
INSERT INTO public.sessions VALUES (6, 1, '2023-01-06 21:43:45.027245');
INSERT INTO public.sessions VALUES (7, 2, '2023-01-06 22:21:15.953698');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://github.com/', '2023-01-06 21:27:30.236508');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'alvaro@linkr.com', '$2b$10$foHjdXZGhrbm7rhpzaNtCePDpNgTEqGAVYq5jRcElyZkQNzSLQRDu', 'alvaro', 'data:image/jpeg;base64,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', '2023-01-06 21:03:08.989633');
INSERT INTO public.users VALUES (2, 'mariana@linkr.com', '$2b$10$lywgmgx6YETE9HsSFFtqMunKME152t5D.N9H5hge4A2CTdJiG5UBS', 'mari', 'data:image/jpeg;base64,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', '2023-01-06 22:21:06.253618');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 17, true);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 4, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 7, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: hashtags hashtags_hashtag_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_hashtag_key UNIQUE (hashtag);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: postsHashtags postsHashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: postsHashtags postsHashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_fk0" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: postsHashtags postsHashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_fk1" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

