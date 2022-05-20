ALTER TABLE IF EXISTS public.purchases ADD COLUMN group_purchase_name IF NOT EXISTS varchar(20);


CREATE TABLE public.groupped_purchases (
                                   id integer NOT NULL,
                                   project_name integer NOT NULL,
                                   creation_date date NOT NULL
);

ALTER TABLE public.groupped_purchases OWNER TO grouppurchaseadmin;
--
-- Name: groupped_purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: grouppurchaseadmin
--

CREATE SEQUENCE public.groupped_purchases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groupped_purchases_id_seq OWNER TO grouppurchaseadmin;

--
-- Name: groupped_purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grouppurchaseadmin
--

ALTER SEQUENCE public.groupped_purchases_id_seq OWNED BY public.groupped_purchases.id;

--
-- Name: groupped_purchases id; Type: DEFAULT; Schema: public; Owner: grouppurchaseadmin
--

ALTER TABLE ONLY public.groupped_purchases ALTER COLUMN id SET DEFAULT nextval('public.groupped_purchases_id_seq'::regclass);


ALTER TABLE public.purchases
    ADD CONSTRAINT ref_project FOREIGN KEY(groupped_purchase_id) references public.groupped_purchases(id)
