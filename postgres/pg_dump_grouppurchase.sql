--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: bills; Type: TABLE; Schema: public; Owner: grouppurchaseadmin
--

CREATE TABLE public.bills (
    id integer NOT NULL,
    user_id integer NOT NULL,
    creation_date date NOT NULL
);


ALTER TABLE public.bills OWNER TO grouppurchaseadmin;

--
-- Name: bill_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.bill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bill_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: bill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.bill_id_seq OWNED BY public.bills.id;


--
-- Name: bill_items; Type: TABLE; Schema: public; Owner: grouppurchaseadmin
--

CREATE TABLE public.bill_items (
    id integer NOT NULL,
    buyer_id integer NOT NULL,
    amount money NOT NULL
);


ALTER TABLE public.bill_items OWNER TO grouppurchaseadmin;

--
-- Name: bill_items_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.bill_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bill_items_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: bill_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.bill_items_id_seq OWNED BY public.bill_items.id;


--
-- Name: purchase_items; Type: TABLE; Schema: public; Owner: grouppurchaseadmin
--

CREATE TABLE public.purchase_items (
    id integer NOT NULL,
    purchase_id integer NOT NULL,
    label character varying(100) NOT NULL,
    quantity integer NOT NULL,
    buyer_id integer NOT NULL
);


ALTER TABLE public.purchase_items OWNER TO grouppurchaseadmin;

--
-- Name: purchase_items_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.purchase_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_items_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: purchase_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.purchase_items_id_seq OWNED BY public.purchase_items.id;


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: grouppurchaseadmin
--

CREATE TABLE public.purchases (
    id integer NOT NULL,
    user_id integer NOT NULL,
    creation_date date NOT NULL,
    shipping_fee money NOT NULL
);


ALTER TABLE public.purchases OWNER TO grouppurchaseadmin;

--
-- Name: purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.purchases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchases_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.purchases_id_seq OWNED BY public.purchases.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: grouppurchaseadmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    birth_date date
);


ALTER TABLE public.users OWNER TO grouppurchaseadmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bill_items id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bill_items ALTER COLUMN id SET DEFAULT nextval('public.bill_items_id_seq'::regclass);


--
-- Name: bills id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bills ALTER COLUMN id SET DEFAULT nextval('public.bill_id_seq'::regclass);


--
-- Name: purchase_items id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchase_items ALTER COLUMN id SET DEFAULT nextval('public.purchase_items_id_seq'::regclass);


--
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchases_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bill_items; Type: TABLE DATA; Schema: public; Owner: grouppurchaseadmin
--

COPY public.bill_items (id, buyer_id, amount) FROM stdin;
\.


--
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: grouppurchaseadmin
--

COPY public.bills (id, user_id, creation_date) FROM stdin;
\.


--
-- Data for Name: purchase_items; Type: TABLE DATA; Schema: public; Owner: grouppurchaseadmin
--

COPY public.purchase_items (id, purchase_id, label, quantity, buyer_id) FROM stdin;
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: grouppurchaseadmin
--

COPY public.purchases (id, user_id, creation_date, shipping_fee) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: grouppurchaseadmin
--

COPY public.users (id, name, birth_date) FROM stdin;
\.


--
-- Name: bill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grouppurchaseadmin
--

SELECT pg_catalog.setval('public.bill_id_seq', 1, false);


--
-- Name: bill_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grouppurchaseadmin
--

SELECT pg_catalog.setval('public.bill_items_id_seq', 1, false);


--
-- Name: purchase_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grouppurchaseadmin
--

SELECT pg_catalog.setval('public.purchase_items_id_seq', 1, false);


--
-- Name: purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grouppurchaseadmin
--

SELECT pg_catalog.setval('public.purchases_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grouppurchaseadmin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: bill_items bill_items_pkey; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bill_items
    ADD CONSTRAINT bill_items_pkey PRIMARY KEY (id);


--
-- Name: bills bill_pkey; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bill_pkey PRIMARY KEY (id);


--
-- Name: users name_unique; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT name_unique UNIQUE (name);


--
-- Name: purchase_items purchase_items_pkey; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT purchase_items_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: purchase_items ref_buyer; Type: FK CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT ref_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: bill_items ref_buyer; Type: FK CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bill_items
    ADD CONSTRAINT ref_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: purchase_items ref_purchase; Type: FK CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT ref_purchase FOREIGN KEY (purchase_id) REFERENCES public.purchases(id);


--
-- Name: purchases ref_user; Type: FK CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT ref_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: bills ref_user; Type: FK CONSTRAINT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT ref_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

