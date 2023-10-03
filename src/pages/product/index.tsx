import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { useState, ChangeEvent } from 'react'
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from "../../services/api";
import { type } from "os";

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

    

    const[avatarUrl, setAvatarUrl] = useState('');

    const[imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)


    //Quando você seleciona uma nova categoria na lista
    function handleChangeCategory(event){
        
        setCategorySelected(event.target.value)

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }
        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }

    }

    return(
        <>
        <Head>
            <title>Novo Produto - Sujeito Pizzaria</title>
        </Head>
        <div>
            <Header></Header>

            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>


                    <label className={styles.labelAvatar}>

                        <span>
                            <FiUpload size={25} color="#fff"/>
                        </span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                        {avatarUrl && (
                            <img 
                            className={styles.preview}
                            src={avatarUrl} 
                            alt="foto do produto"
                            width={250}
                            height={250} 
                            />
                        )}

                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}

                                </option>
                            )
                        })}
                    </select>
                    <input 
                    type="text" 
                    placeholder="Digite o nome do produto" 
                    className={styles.input}
                    />

                    <input 
                    type="text" 
                    placeholder="Preço do Produto" 
                    className={styles.input}
                    />

                    <textarea
                    placeholder="Descreva seu produto..."
                    className={styles.input}
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>


                </form>

            </main>



        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/category')

    //console.log(response.data)
    return {
        props: {
            categoryList: response.data
        }
    }
})