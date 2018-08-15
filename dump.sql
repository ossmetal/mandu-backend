--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 9.5.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.propuesta DROP CONSTRAINT prop_admin;
ALTER TABLE ONLY public.inversion DROP CONSTRAINT inv_prop;
ALTER TABLE ONLY public.imgs DROP CONSTRAINT img_prop;
ALTER TABLE ONLY public.casos_exito DROP CONSTRAINT casos_prop;
ALTER TABLE ONLY public.users DROP CONSTRAINT usrs_id;
ALTER TABLE ONLY public.propuesta DROP CONSTRAINT prop_id;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.propuesta ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.propuesta_id_seq;
DROP TABLE public.propuesta;
DROP TABLE public.inversion;
DROP TABLE public.imgs;
DROP TABLE public.casos_exito;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: casos_exito; Type: TABLE; Schema: public; Owner: businesspropadmin
--

CREATE TABLE public.casos_exito (
    name character varying(120),
    parent character varying(120),
    prop_id integer
);


ALTER TABLE public.casos_exito OWNER TO businesspropadmin;

--
-- Name: imgs; Type: TABLE; Schema: public; Owner: businesspropadmin
--

CREATE TABLE public.imgs (
    filename character varying(32),
    prop_id integer
);


ALTER TABLE public.imgs OWNER TO businesspropadmin;

--
-- Name: inversion; Type: TABLE; Schema: public; Owner: businesspropadmin
--

CREATE TABLE public.inversion (
    type character varying(60),
    cant numeric,
    prop_id integer
);


ALTER TABLE public.inversion OWNER TO businesspropadmin;

--
-- Name: propuesta; Type: TABLE; Schema: public; Owner: businesspropadmin
--

CREATE TABLE public.propuesta (
    id integer NOT NULL,
    created_by integer NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    isactive character(1) DEFAULT 'Y'::bpchar NOT NULL,
    valid_to date,
    uri character varying(32)
);


ALTER TABLE public.propuesta OWNER TO businesspropadmin;

--
-- Name: propuesta_id_seq; Type: SEQUENCE; Schema: public; Owner: businesspropadmin
--

CREATE SEQUENCE public.propuesta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.propuesta_id_seq OWNER TO businesspropadmin;

--
-- Name: propuesta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: businesspropadmin
--

ALTER SEQUENCE public.propuesta_id_seq OWNED BY public.propuesta.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: businesspropadmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(120),
    email character varying(120),
    password character varying(32)
);


ALTER TABLE public.users OWNER TO businesspropadmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: businesspropadmin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO businesspropadmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: businesspropadmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.propuesta ALTER COLUMN id SET DEFAULT nextval('public.propuesta_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: casos_exito; Type: TABLE DATA; Schema: public; Owner: businesspropadmin
--

COPY public.casos_exito (name, parent, prop_id) FROM stdin;
\.


--
-- Data for Name: imgs; Type: TABLE DATA; Schema: public; Owner: businesspropadmin
--

COPY public.imgs (filename, prop_id) FROM stdin;
Ranza.png	1
\.


--
-- Data for Name: inversion; Type: TABLE DATA; Schema: public; Owner: businesspropadmin
--

COPY public.inversion (type, cant, prop_id) FROM stdin;
mensual	10000	1
\.


--
-- Data for Name: propuesta; Type: TABLE DATA; Schema: public; Owner: businesspropadmin
--

COPY public.propuesta (id, created_by, created, isactive, valid_to, uri) FROM stdin;
1	1	2018-08-11 23:33:19.640699	Y	\N	randohash!
\.


--
-- Name: propuesta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: businesspropadmin
--

SELECT pg_catalog.setval('public.propuesta_id_seq', 1, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: businesspropadmin
--

COPY public.users (id, name, email, password) FROM stdin;
1	Admin	admin@mandu.pe	e10adc3949ba59abbe56e057f20f883e
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: businesspropadmin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: prop_id; Type: CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT prop_id PRIMARY KEY (id);


--
-- Name: usrs_id; Type: CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT usrs_id PRIMARY KEY (id);


--
-- Name: casos_prop; Type: FK CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.casos_exito
    ADD CONSTRAINT casos_prop FOREIGN KEY (prop_id) REFERENCES public.propuesta(id);


--
-- Name: img_prop; Type: FK CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.imgs
    ADD CONSTRAINT img_prop FOREIGN KEY (prop_id) REFERENCES public.propuesta(id);


--
-- Name: inv_prop; Type: FK CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.inversion
    ADD CONSTRAINT inv_prop FOREIGN KEY (prop_id) REFERENCES public.propuesta(id);


--
-- Name: prop_admin; Type: FK CONSTRAINT; Schema: public; Owner: businesspropadmin
--

ALTER TABLE ONLY public.propuesta
    ADD CONSTRAINT prop_admin FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

