import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Product(){
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

                    <select>
                        <option>
                            bebida
                        </option>
                        <option>
                            pizza
                        </option>
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
    return {
        props: {}
    }
})