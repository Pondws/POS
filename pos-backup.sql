PGDMP  
    7                |            db_workshop_pos    16.0    16.0 R               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16416    db_workshop_pos    DATABASE     �   CREATE DATABASE db_workshop_pos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db_workshop_pos;
                postgres    false            �            1259    27935    admins    TABLE     B  CREATE TABLE public.admins (
    id bigint NOT NULL,
    name character varying(255),
    usr character varying(255),
    pwd character varying(255),
    level character varying(255),
    email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.admins;
       public         heap    postgres    false            �            1259    27934    admins_id_seq    SEQUENCE     v   CREATE SEQUENCE public.admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public          postgres    false    236                       0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public          postgres    false    235            �            1259    27132    banks    TABLE     :  CREATE TABLE public.banks (
    id bigint NOT NULL,
    "bankType" character varying(255),
    "bankCode" character varying(255),
    "bankName" character varying(255),
    "bankBranch" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.banks;
       public         heap    postgres    false            �            1259    27131    banks_id_seq    SEQUENCE     u   CREATE SEQUENCE public.banks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.banks_id_seq;
       public          postgres    false    232                       0    0    banks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.banks_id_seq OWNED BY public.banks.id;
          public          postgres    false    231            �            1259    24681    billSaleDetails    TABLE       CREATE TABLE public."billSaleDetails" (
    id bigint NOT NULL,
    "billSaleId" bigint,
    "productId" bigint,
    qty bigint,
    price bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" bigint
);
 %   DROP TABLE public."billSaleDetails";
       public         heap    postgres    false            �            1259    24679    billSaleDetails_id_seq    SEQUENCE     �   CREATE SEQUENCE public."billSaleDetails_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."billSaleDetails_id_seq";
       public          postgres    false    227                       0    0    billSaleDetails_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."billSaleDetails_id_seq" OWNED BY public."billSaleDetails".id;
          public          postgres    false    225            �            1259    24682 	   billSales    TABLE     -  CREATE TABLE public."billSales" (
    id bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" bigint,
    status character varying(255) DEFAULT 'open'::character varying NOT NULL,
    "payDate" timestamp with time zone
);
    DROP TABLE public."billSales";
       public         heap    postgres    false            �            1259    24680    billSales_id_seq    SEQUENCE     {   CREATE SEQUENCE public."billSales_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."billSales_id_seq";
       public          postgres    false    228                       0    0    billSales_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."billSales_id_seq" OWNED BY public."billSales".id;
          public          postgres    false    226            �            1259    27774    changePackages    TABLE     R  CREATE TABLE public."changePackages" (
    id bigint NOT NULL,
    "packageId" bigint,
    "userId" bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "payDate" timestamp with time zone,
    "payHour" bigint,
    "payMinute" bigint,
    "payRemark" character varying(255)
);
 $   DROP TABLE public."changePackages";
       public         heap    postgres    false            �            1259    27773    changepackages_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.changepackages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.changepackages_id_seq;
       public          postgres    false    234                       0    0    changepackages_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.changepackages_id_seq OWNED BY public."changePackages".id;
          public          postgres    false    233            �            1259    16424    members    TABLE       CREATE TABLE public.members (
    id bigint NOT NULL,
    "packageId" bigint,
    name character varying(255),
    phone character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    pass character varying(255)
);
    DROP TABLE public.members;
       public         heap    postgres    false            �            1259    16423    members_id_seq    SEQUENCE     w   CREATE SEQUENCE public.members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.members_id_seq;
       public          postgres    false    218                        0    0    members_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;
          public          postgres    false    217            �            1259    16418    packages    TABLE     �   CREATE TABLE public.packages (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    bill_amount bigint NOT NULL,
    price bigint NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.packages;
       public         heap    postgres    false            �            1259    16442    productImages    TABLE     �   CREATE TABLE public."productImages" (
    id bigint NOT NULL,
    "productId" bigint,
    "imageName" character varying(255),
    "isMain" boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."productImages";
       public         heap    postgres    false            �            1259    16441    productImages_id_seq    SEQUENCE        CREATE SEQUENCE public."productImages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."productImages_id_seq";
       public          postgres    false    222            !           0    0    productImages_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."productImages_id_seq" OWNED BY public."productImages".id;
          public          postgres    false    221            �            1259    16433    products    TABLE     ?  CREATE TABLE public.products (
    id bigint NOT NULL,
    barcode character varying(255),
    name character varying(255),
    cost bigint,
    price bigint,
    detail character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" bigint
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16432    products_id_seq    SEQUENCE     x   CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    220            "           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    219            �            1259    26185    stocks    TABLE     �   CREATE TABLE public.stocks (
    id bigint NOT NULL,
    "productId" bigint,
    qty bigint,
    "userId" bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.stocks;
       public         heap    postgres    false            �            1259    26184    stocks_id_seq    SEQUENCE     v   CREATE SEQUENCE public.stocks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.stocks_id_seq;
       public          postgres    false    230            #           0    0    stocks_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.stocks_id_seq OWNED BY public.stocks.id;
          public          postgres    false    229            �            1259    16417    tb_package_id_seq    SEQUENCE     �   ALTER TABLE public.packages ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_package_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    24670    users    TABLE     4  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255),
    usr character varying(255),
    pwd character varying(255),
    level character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24669    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    224            $           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    223            V           2604    27948 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            T           2604    27135    banks id    DEFAULT     d   ALTER TABLE ONLY public.banks ALTER COLUMN id SET DEFAULT nextval('public.banks_id_seq'::regclass);
 7   ALTER TABLE public.banks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            P           2604    24689    billSaleDetails id    DEFAULT     |   ALTER TABLE ONLY public."billSaleDetails" ALTER COLUMN id SET DEFAULT nextval('public."billSaleDetails_id_seq"'::regclass);
 C   ALTER TABLE public."billSaleDetails" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    225    227            Q           2604    24687    billSales id    DEFAULT     p   ALTER TABLE ONLY public."billSales" ALTER COLUMN id SET DEFAULT nextval('public."billSales_id_seq"'::regclass);
 =   ALTER TABLE public."billSales" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    228    228            U           2604    27777    changePackages id    DEFAULT     x   ALTER TABLE ONLY public."changePackages" ALTER COLUMN id SET DEFAULT nextval('public.changepackages_id_seq'::regclass);
 B   ALTER TABLE public."changePackages" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234            L           2604    16427 
   members id    DEFAULT     h   ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);
 9   ALTER TABLE public.members ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            N           2604    16445    productImages id    DEFAULT     x   ALTER TABLE ONLY public."productImages" ALTER COLUMN id SET DEFAULT nextval('public."productImages_id_seq"'::regclass);
 A   ALTER TABLE public."productImages" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            M           2604    16436    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            S           2604    26188 	   stocks id    DEFAULT     f   ALTER TABLE ONLY public.stocks ALTER COLUMN id SET DEFAULT nextval('public.stocks_id_seq'::regclass);
 8   ALTER TABLE public.stocks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            O           2604    24673    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224                      0    27935    admins 
   TABLE DATA           \   COPY public.admins (id, name, usr, pwd, level, email, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   E`                 0    27132    banks 
   TABLE DATA           o   COPY public.banks (id, "bankType", "bankCode", "bankName", "bankBranch", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   �`                 0    24681    billSaleDetails 
   TABLE DATA           z   COPY public."billSaleDetails" (id, "billSaleId", "productId", qty, price, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    227   ma                 0    24682 	   billSales 
   TABLE DATA           `   COPY public."billSales" (id, "createdAt", "updatedAt", "userId", status, "payDate") FROM stdin;
    public          postgres    false    228   �d                 0    27774    changePackages 
   TABLE DATA           �   COPY public."changePackages" (id, "packageId", "userId", "createdAt", "updatedAt", "payDate", "payHour", "payMinute", "payRemark") FROM stdin;
    public          postgres    false    234   Mf                 0    16424    members 
   TABLE DATA           _   COPY public.members (id, "packageId", name, phone, "createdAt", "updatedAt", pass) FROM stdin;
    public          postgres    false    218   �f                  0    16418    packages 
   TABLE DATA           Z   COPY public.packages (id, name, bill_amount, price, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   }g                 0    16442    productImages 
   TABLE DATA           k   COPY public."productImages" (id, "productId", "imageName", "isMain", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �g                 0    16433    products 
   TABLE DATA           n   COPY public.products (id, barcode, name, cost, price, detail, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    220   i                 0    26185    stocks 
   TABLE DATA           Z   COPY public.stocks (id, "productId", qty, "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   Xj                 0    24670    users 
   TABLE DATA           ^   COPY public.users (id, name, usr, pwd, level, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    224   �j       %           0    0    admins_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admins_id_seq', 6, true);
          public          postgres    false    235            &           0    0    banks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.banks_id_seq', 2, true);
          public          postgres    false    231            '           0    0    billSaleDetails_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."billSaleDetails_id_seq"', 69, true);
          public          postgres    false    225            (           0    0    billSales_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."billSales_id_seq"', 25, true);
          public          postgres    false    226            )           0    0    changepackages_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.changepackages_id_seq', 7, true);
          public          postgres    false    233            *           0    0    members_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.members_id_seq', 26, true);
          public          postgres    false    217            +           0    0    productImages_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."productImages_id_seq"', 20, true);
          public          postgres    false    221            ,           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public          postgres    false    219            -           0    0    stocks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.stocks_id_seq', 5, true);
          public          postgres    false    229            .           0    0    tb_package_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tb_package_id_seq', 1, false);
          public          postgres    false    215            /           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 14, true);
          public          postgres    false    223            l           2606    27958    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    236            h           2606    27139    banks banks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.banks DROP CONSTRAINT banks_pkey;
       public            postgres    false    232            b           2606    24693 $   billSaleDetails billSaleDetails_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."billSaleDetails"
    ADD CONSTRAINT "billSaleDetails_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."billSaleDetails" DROP CONSTRAINT "billSaleDetails_pkey";
       public            postgres    false    227            d           2606    24692    billSales billSales_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."billSales"
    ADD CONSTRAINT "billSales_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."billSales" DROP CONSTRAINT "billSales_pkey";
       public            postgres    false    228            j           2606    27779 "   changePackages changepackages_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."changePackages"
    ADD CONSTRAINT changepackages_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."changePackages" DROP CONSTRAINT changepackages_pkey;
       public            postgres    false    234            Z           2606    16431    members members_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            postgres    false    218            ^           2606    16447     productImages productImages_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_pkey";
       public            postgres    false    222            \           2606    16440    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    220            f           2606    26191    stocks stocks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stocks_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.stocks DROP CONSTRAINT stocks_pkey;
       public            postgres    false    230            X           2606    16422    packages tb_package_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.packages
    ADD CONSTRAINT tb_package_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.packages DROP CONSTRAINT tb_package_pkey;
       public            postgres    false    216            `           2606    24677    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    224            n           2606    30557 /   billSaleDetails billSaleDetails_billSaleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."billSaleDetails"
    ADD CONSTRAINT "billSaleDetails_billSaleId_fkey" FOREIGN KEY ("billSaleId") REFERENCES public."billSales"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."billSaleDetails" DROP CONSTRAINT "billSaleDetails_billSaleId_fkey";
       public          postgres    false    4708    227    228            o           2606    30566 .   billSaleDetails billSaleDetails_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."billSaleDetails"
    ADD CONSTRAINT "billSaleDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE;
 \   ALTER TABLE ONLY public."billSaleDetails" DROP CONSTRAINT "billSaleDetails_productId_fkey";
       public          postgres    false    220    4700    227            m           2606    30556 *   productImages productImages_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_productId_fkey";
       public          postgres    false    4700    220    222               �   x�}��
�@��٧�]��ڜ��zi��`�`}�ًTtCȐ���Ϲ�F8��j���r�X/Sqk��#Ƥj�DAa�*>@�
���'5��f�ڒ�bҔ�	�,���7RL	髦s�yM����q�]��z��1e��,�����ѝig�Y2��!�7g,P�         d   x�3�,NN�44264544�LLI��,M���4202�54�54S00�#ms�\F��I�yٜF&F��f�憜!���N�y����PMF�F�X�B����� � (         N  x�}�K��0D��)z?Q
!@����I��G�Mm2�B钖�Вb��I���!���q݄C��b���Jy���mQC��P:	���B x�� �G$�!��)�4`t��^8FENL[204���>�!њ"08��3k�V|�-�C�L�|xu�a��tKp"��Wۑ�a`ƞ��H���%`�t���Mk�&f�J�����>���*%�K-�)V�L0�-�MrhmH�[ǂ���*��[� b��SS�aN�V�{,�4�R�2��[�,3nų��5��䦗�I�q�4��$����R�b�;c��%�0o�����X�|K��q�0�.s�.׹�a&�s��<�|�S���c�@կ�C�J�<3�3��N@�P3��`�Yio�V�ƙ4�an��z	��6��緤	F�9x/��2mQB/9�gl�jcJeK���s$p�8cr����g,�eT���[�,�R�[��o
w�ٓ�)����\����p:	�j���/7��$.�!Ѫ@蘠?s�lJ.���!���x�Ջ����ؑ����K�7��\d�����YvM����'3&���NB4�j���h�=,�f{=�g8�B��!{�ƉJ��ۭ�����].�g�(�&w�|"}b�ob�U����)�M(��yT���`֫w�8j�g�s�:�8�8�j��)P"�sK���7��I<�R��=3�Јw��xz	�f����RL%Zs4�$A���é�Uj��um�N�@�@�����u
(�.���?�71�0"�#~�R�FXo���Pʲo�NnN��K������4d�-�ӌ�R�,,�c�O�����u�aí         r  x�u�;R�0E�x�5�+=i� -�e��fG�M}�ϼ��!ѕe��ƥ17�D%�S�Gl[��1%���/�����c�E C4�)G
���P��,��0f�`��Sd��V��4��1-�����hx����&o�G�u4�J �o��y�c��!7���&�2P���	O
Ɯ�pJe�'�(�߼�cR(�����֤���
�\����l�ީpȱV��M)�Nw�;g+�J�se�r>�e$������	TjҷJ��#=כ8js�?uR1�A��aIT��~�,�������~���}���9�^MT�C���	v{<�C��\S�y�9{�"����R�i☓�R!�m�\Ӳ,�F�         M   x�]ɱ�0D�ڞ"=J�;�8�L��� 
�_��B!�F�`�lXg����Gn�">�G�e��nL��}��zlR�         �   x�}Ͻn�@�z��O�?�;o!QF�2eL�������0��|�!�����X��y&���@t` =���Pt��N;aR:̗���^S�-1(�\<ƦI��Q��=gגJ�?T=�'B�\�ۀ�<��1&+�Q�U+e���$�\k��g�Z��,%hd;�)�:�����e�l�:%�?>T7�+u]�]^[P          G   x�3�t�+I-*(�,N�44 0�id`d�kh�kd�```F�ĸ�8��ZL��f��V�
���xM1z\\\ ��"1         7  x�u�;n�P�ZZE��������?�78��\	�%�	�v�p��<U����S,"���<�}O���\���7�5�D���aޠ.H/PQT2S	/���jqa�TK����oP�)8�7�.�:3Q�T/�=xCM(��)}����4#(��+뼕��9&�U�QaH<�<��%l.�=W�R��H�w'w�L_!i�8Ϩ?��G�:J��=�є-�:k]n��SZl��WiG�mύ��D0��#:�[�{h��$�w���Q{CBӛ$0JL=��w�,$���,�����Ō;:?�<�/ץ�         -  x�u�Mk1�s�W�]f&��X���G/b�wѵ�ߤ�PK�l.�y��BE�^����;�Q�ETӦYO��(-I�� ����+����S�&dUZ�|��cwV&��br���SG�T�b�l:5����Gk@�T9�b'��j6��ޘk\������1z_8�9�`1_���j�Jyȼ͟��� �VK!2Ef@���I�������s�Z2�[��\~B]��B�9C�V�v7�iw�_ϗ�]���Sw��h8�A`�������Njѿu�~�񫐾��L)sNƱ��i<Xns���i�1��^         S   x�}���0�3L�ݔ�He���x1�i<�<�I�dj�`Ͱ��r�a�k�;A)��G��ȹ�;�����/�%�|)�"�         o   x�m�9
�@D�x�ʅ���Y�>��8�-�O���T��!���@�n���1P�	�Pj	��P~��)�$9wG����i>�������y���P�?^k�d��=�{�P�#�     