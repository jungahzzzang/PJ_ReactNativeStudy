import {useState, useEffect} from 'react';

/*
    전달받은 API의 주소로 요청을 보내고
    그 결과를 성공 여부에 따라 data or error에 담아서 반환하는 컴포넌트
*/

export const useFetch = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    //API 진행 상태 관리
    const [inProgress, setInProgress] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
        try{
            const res = await fetch(url);
            const result = await res.json();

            if(res.ok){
                setData(result);
                setError(null);
                setInProgress(true);
            }else{
                throw result;
            }
        }catch(error){
            setError(error);
        }finally{
            setInProgress(false);
        }
    };
        fetchData();
    }, []);

    return {data, error, inProgress};
}