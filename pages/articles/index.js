import BaseLayout from "../../components/containers/BaseLayout"
import Link from "next/link"
import firebaseApp from "../../net/firebaseApp";
import {getFirestore , collection , getDocs} from "firebase/firestore/lite"
import { DateTime } from "luxon";
import {Button} from "antd"
import { useEffect, useState } from "react"

function Item({article}){
    return(
        <tr >
            <th scope="row">{article.id}</th>
            <td>{article.name}</td>
            <td>{article.age}</td>
            <td>{article.live}</td>
            <td>{article.work}</td>
            <td>{article.phone}</td>
            <td>{DateTime.fromSeconds(article.created_at.seconds).toFormat('yyyy-LL-dd')}</td>
        </tr>
    )
}


export default function ArticleList(){
    const [articles , setArticles] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const firestore = getFirestore(firebaseApp);
            const articles = collection(firestore , 'articles');
            const GetDoc = await getDocs(articles);
            
            setArticles(GetDoc.docs.map(doc => ({
                id : doc.id,
                ...doc.data()
            })).sort((x , y) => x.created_at.seconds < y.created_at.seconds ? 0 : -1)
            )
         
        }
        fetchData();
        
    }, [])




    return(
        <BaseLayout>
            <h1>직원정보 crud</h1>
          <div className="container">
            <table className="table container text-justify">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (<Item key={article.id} article={article} />))}
                </tbody>
                </table>
            </div>
           


            <div className="flex flex-row justify-end">
                <Link href="/articles/create" passHref>
                    <Button>직원정보 추가</Button>
                </Link>
            </div>
       
        </BaseLayout>
    )
}