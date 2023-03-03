--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

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
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text,
    url text NOT NULL,
    "userId" integer NOT NULL,
    visits bigint DEFAULT 0 NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
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
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    token text,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
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
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'QbVziBGu', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=cpl&utm_campaign=retargeting-bluekjjerwgfderfegdvdgh', 1, 0, '2023-03-03 08:36:37.137974');
INSERT INTO public.urls VALUES (3, '5KXm6Mfa', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=cpl&utm_campaign=retargeting-bluekjjerwgfderfegdvdtrsgh', 1, 0, '2023-03-03 08:36:39.794457');
INSERT INTO public.urls VALUES (4, '5Cbkfsfo', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=rtrcpl&utm_campaign=retargeting-bluekjjerwgfderfegdvdtrsgh', 1, 0, '2023-03-03 08:36:42.372932');
INSERT INTO public.urls VALUES (5, 'mJ2FX5l-', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=rtrcpl&utm_campaign=retargeting-bluekjjerwgfderfegdvdrsgbgtrsgh', 1, 0, '2023-03-03 08:36:44.921328');
INSERT INTO public.urls VALUES (6, 'Wd-hA0_L', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=rtrcpl&utm_campaign=retargeting-bluekjjerwgfargrderfegdvdrsgbgtrsgh', 1, 0, '2023-03-03 08:36:47.395297');
INSERT INTO public.urls VALUES (7, 'R9yWHROp', 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=rtrcpl&utm_campaign=retarsrgeting-bluekjjerwgfargrderfegdvdrsgbgtrsgh', 1, 0, '2023-03-03 08:36:50.147835');
INSERT INTO public.urls VALUES (1, NULL, 'https://www.casar.com/promocoes/?deal=pl3s&utm_source=blue&utm_medium=cpl&utm_campaign=retargeting-bluekjjerwgfderfegd', 1, 0, '2023-03-03 08:36:04.584265');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'lala', 'lala@driven.com.br', '$2b$10$sBLJGf89h166/vmA0f1vR.EdccRcSLNN9xueU2V8oU2bxL4mPll.i', '01dc2fb2-9da1-4066-85e7-b6f19fb6a2c9', '2023-03-03 08:33:59.804031');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

