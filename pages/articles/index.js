import BaseLayout from "../../components/containers/BaseLayout"
import Link from "next/link"
import firebaseApp from "../../net/firebaseApp";
import {getFirestore , collection , getDocs} from "firebase/firestore/lite"
import { DateTime } from "luxon";
import {Button , Table} from "antd"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit , faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// function Item({article}){
//     return(
//         <tr className="border" >
//             <th scope="row" className="py-3 px-2">{article.id}</th>
//             <td className="pl-3">
    
//             <a><FontAwesomeIcon icon={faEdit} className="fas fa-edit" size="lg" /> & </a>

//             <a><FontAwesomeIcon icon={faTrashAlt} className="fas fa-trash-alt" size="lg" /></a>

//             </td>
//             <td>{article.name}</td>
//             <td>{article.age}</td>
//             <td>{article.live}</td>
//             <td>{article.work}</td>
//             <td>{article.phone}</td>
//             <td>{DateTime.fromSeconds(article.created_at.seconds).toFormat('yyyy-LL-dd')}</td>
//         </tr>
//     )
// }


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

    const columns = [
        {
          title: '직원번호',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '이름',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '나이',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '부서',
          dataIndex: 'work',
          key: 'work',
        },
        {
          title: '핸드폰번호',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '거주지역',
          dataIndex: 'live',
          key: 'live',
        },
        {
          title: '입사일자',
          dataIndex: 'created_at',
          key: 'created_at',
          render : (text , record) => {
                return DateTime.fromSeconds(record.created_at.seconds).toFormat('yyyy-LL-dd HH:mm')
          }
        },
      ];


    return(
        <BaseLayout>
            <h1>직원정보 crud</h1>
    
            {/* <table className="table container text-justify">
                <thead>
                    <tr className="border">
                        <th scope="col" className="py-3 px-2">직원번호</th>
                        <th scope="col">
                            수정 & 변경
                        </th>
                        <th scope="col">이름</th>
                        <th scope="col">나이</th>
                        <th scope="col">거주지역</th>
                        <th scope="col">부서</th>
                        <th scope="col">연락처</th>
                        <th scope="col">입사일자</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (<Item key={article.id} article={article} />))}
                </tbody>
                </table> */}
            {console.log("articles :::" , articles)}
            <Table dataSource={articles} columns={columns} rowKey={'id'} />;


            <div className="flex flex-row justify-end my-6">
                <Link href="/articles/create" passHref>
                    <Button>직원정보 추가</Button>
                </Link>
            </div>
       
        </BaseLayout>
    )
}