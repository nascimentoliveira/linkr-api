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
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    comment text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    "followedId" integer NOT NULL,
    "followerId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


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
-- Name: shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shares (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shares_id_seq OWNED BY public.shares.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
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
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


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
-- Name: shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares ALTER COLUMN id SET DEFAULT nextval('public.shares_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 1, 10, 'a', '2023-01-10 17:29:36.108938');


--
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '2023-01-10 16:56:15.088769');


--
-- Data for Name: shares; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (10, 'https://github.com/', 'GitHub: Let’s build from here', 'https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png', 'GitHub is where over 94 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.', '2023-01-10 17:29:36.106413');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'alvaro@teste.com', '$2b$10$Lv4qasayZq3WBS3sb/ZTPuVvveyUHqEq1X2GIh6HTSU3I04wA.L1S', 'pele', 'data:image/jpeg;base64,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', '2023-01-10 16:56:07.070789');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 1, false);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, false);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, true);


--
-- Name: shares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shares_id_seq', 1, false);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


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
-- Name: shares shares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);


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
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk1 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: followers followers_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_fk0 FOREIGN KEY ("followedId") REFERENCES public.users(id);


--
-- Name: followers followers_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_fk1 FOREIGN KEY ("followerId") REFERENCES public.users(id);


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
-- Name: shares shares_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_fk0 FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: shares shares_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_fk1 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

