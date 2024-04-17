import { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer } from "../../../styles/Styles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 90%;
`;


const SubArea = styled.input`

  height: 50px;
  border: none;
  border-bottom: 2px solid #E8E8E8;
  outline: none; 
  margin-bottom: 10px;
  margin-top: 30px;

  &::placeholder {
    font-size: 32px;
    font-family: "laundryR";
    color: #959595;
  }

`;

const TextArea = styled.textarea`
  border: none;
  width: 90%;
  resize: none;
  
  &::placeholder {
    font-size: 20px;
    font-family: "laundryR";
    color: #959595;
  }

  &:focus {
    font-size: 20px;
    font-family: "laundryR";
    outline: none;
    border-color: #A3CCAA;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #A3CCAA;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #A3CCAA;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #A3CCAA;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
export default function upload() {
  const [isLoading, setLoading] = useState(false);
  
  const [sub, setsub] = useState("");
  const [text, settext] = useState("");
  
  
  const [file, setFile] = useState(null);
  
  const onChange = (e) => {
    settext(e.target.value);
  };

  const onSub = (e) => {
    setsub(e.target.value);
  };



  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1 && files[0].size < 1024*1024) {
      setFile(files[0]);
    }else{
        alert(`Please select one file that is 1MB or less.`);
    }
  };
  



  const onSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString();
    const postData = {
        "subject": sub,
        "content": text,
        "create_date": currentDate,
        "post_region": "string",
        "author": 1,
      
    };
    console.log(postData);

    axios.post('http://localhost:8000/community/post/', postData)
    .then(response => {
      console.log('Post successful:', response.data);
    })
    .catch(error => {
      console.error('Error posting:', error);
    });
  };

  return (
    <Wrapper>

      <Title>
        <div><BackButton><img src={leftlogo}/></BackButton></div>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>게시물 등록</span></TitleDiv>
       
      </Title>
        
        <Form onSubmit={onSubmit}>
           <SubArea
           required
           maxLength={10}
           onChange={onSub}
           value={sub}
           placeholder="제목"
           />
            <TextArea
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={text}
            placeholder="자유롭게 게시물을 등록해주세요!"
            />
            <AttachFileButton htmlFor="file">
            {file ? "사진 추가 완료! ✅" : "사진도 추가하실래요?"}
            </AttachFileButton>
            <AttachFileInput
            onChange={onFileChange}
            type="file"
            id="file"
            accept="image/*"
            />
            <SubmitBtn
            type="submit"
            value={isLoading ? "등록중..." : "게시글 등록!"}
            />
        </Form>
    </Wrapper>
  );
}