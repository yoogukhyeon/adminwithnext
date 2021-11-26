import BaseLayout from "../../components/containers/BaseLayout"
import {Form,Input,Button,Select,InputNumber,Option  } from 'antd';
import firebaseApp from "../../net/firebaseApp";
import {getFirestore , collection , addDoc} from "firebase/firestore/lite"
import { useRouter } from "next/dist/client/router";



export default function Page(){
    const [form] = Form.useForm();
    const router = useRouter();


    return (
      <BaseLayout>
         <h1>버튼 추가 성공</h1>

      <Form
        form={form}

        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        
        onFinish={async (value) => {
            const fireStore = getFirestore(firebaseApp);
            const articles = collection(fireStore , 'articles');
            const AddDoc = await addDoc(articles , {
                ...value,
                created_at : new Date(),
                updated_at : new Date()
            })
            console.log('AddDoc' , AddDoc)
            router.back();
        }}
      >


        <Form.Item label="이름" required name="name">
          <Input />
        </Form.Item>

        <Form.Item label="담당부서" required name="work">
            <Select>
                <Select.Option value="개발팀">개발팀</Select.Option>
                <Select.Option value="클래스팀">클래스팀</Select.Option>
                <Select.Option value="인사팀">인사팀</Select.Option>
                <Select.Option value="마케팅팀">마케팅팀</Select.Option>
                <Select.Option value="영상팀">영상팀</Select.Option>
            </Select>
        </Form.Item>


        <Form.Item name="age" label="나이" required rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
        </Form.Item>  


        <Form.Item label="거주지역" name="live">
          <Select>
            <Select.Option value="서울특별시">서울특별시</Select.Option>
            <Select.Option value="강원도">강원도</Select.Option>
            <Select.Option value="경기도">경기도</Select.Option>
            <Select.Option value="경상도">경상도</Select.Option>
            <Select.Option value="전라남도">전라남도</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item name="phone" label="핸드폰번호"
                    rules={[
                    {
                        required: true,
                        message: '핸드폰번호를 입력해주세요',
                    },
                    ]}
                    >
        <Input style={{width: '100%',}}/>
        </Form.Item>

        <div className="flex flex-row justify-center">
            <Form.Item>
                <Button type="primary" htmlType="submit">전송</Button>
            </Form.Item>
        </div>
      </Form>
      </BaseLayout>
    )
}