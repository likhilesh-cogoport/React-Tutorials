import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './styles.module.css';
function App(){
    
    const [inputText, setInputText] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchDate1, setSearchDate1] = useState("");
    const [searchDate2, setSearchDate2] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchState, setSearchState] = useState(false);
    const [categories, setCategories] = useState([]);
    const [todos, setTodos] = useState([]);
    const [data, setData] = useState([]);
    // const [result, setResult] = useState([]);
    const [validInput, setValidInput] = useState(false);

    useEffect(() => {
      checkValidInput();
    }, [inputText,inputDate,inputCategory]);

    useEffect(() => {
      let localTodos = getTodosFromDevice();
      if(localTodos)setTodos(JSON.parse(localTodos));
    }, [])

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
        createCategorySet();
        setData(todos);
        setInputEmpty();
        setSearchEmpty();
    },[todos]);
    
    function createCategorySet(){
        let temp_arr = todos.map(t=>{
            return t.category
        });
        setCategories(Array.from(new Set(temp_arr)));
    }

    function checkValidInput(){
        if((inputText.length>0) && (inputDate.length>0) && (inputCategory.length>0)){
            setValidInput(true);
        }
    }
    function setInputEmpty(){
        setValidInput(false);
        setInputCategory("");
        setInputDate("");
        setInputText("");
    }
    function setSearchEmpty(){
        setSearchCategory("");
        setSearchDate1("");
        setSearchDate2("");
        setSearchText("");
    }
    function addTodo(){
        setTodos([
            ...todos,
            {
                id:todos.length+1,
                text:inputText,
                category:inputCategory.toLowerCase(),
                date:inputDate,
                status:false
            }
        ]);
        setInputEmpty();
        clearSearch();
    }
    function deleteTodo(x){
        setTodos(
            todos.filter(t=>t.id!=x)
        );
    }
    function markAsDone(x){
        setTodos(
            todos.map((t)=>{
                if(t.id==x){
                    t.status=!t.status;
                }
                return t;
            })
        );
    }
    function getTodosFromDevice(){
        return localStorage.getItem("todos");
    }
    function searchTodos(){
        setSearchState(true);
        let arr = todos;
        arr=arr.filter(t=>checkCorrectTodo(t));
        setData(arr);
    }
    function checkCorrectTodo(td){
        let flag=true;
        if(searchCategory.length>0 && searchCategory!='all'){
            if(searchCategory!=td.category){
                flag=false;
            }
        }
        if(searchDate1.length>0||searchDate2.length>0){
            let d1=new Date(searchDate1);
            let d2=new Date(searchDate2);
            let d=new Date(td.date);
            if(searchDate1.length>0 && searchDate2.length>0){
                if( d<d1 || d>d2){
                    flag=false;
                    // alert('false '+d1+"  "+d2);
                }
                // alert('true '+d1+"  "+d2);
            }
            else if(searchDate1.length>0){
                if(d<d1){
                    flag=false;
                }
            }
            else{
                if(d>d2){
                    flag=false;
                }
            }
            // if(searchDate1!=td.date){
            //     flag=false;
            // }
        }
        if(searchText.length>0){
            if(td.text.toLowerCase().includes(searchText.toLowerCase())){
                let x;
            }
            else{
                flag=false;
            }
        }
        return flag;
    }
    function clearSearch(){
        setSearchEmpty();
        setSearchState(false);
        setData(todos);
    }
    return(
        <div className={styles.univ}>
            <div className={styles.topBar}>
                <h1>TODO LIST</h1>
            </div>
            <div className={styles.inputBar}>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>Todo</p>
                    <input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
                </div>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>Date</p>
                    <input type="date" value={inputDate} onChange={(e)=>setInputDate(e.target.value)}/>
                </div>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>Category</p>
                    <input type="text" value={inputCategory} onChange={(e)=>setInputCategory(e.target.value)}/>
                </div>
                
                {
                    validInput?
                    <button onClick={addTodo} className={styles.btn_type1}>Add</button>:
                    <button disabled className={styles.btn_type2}>Add</button>
                }
            </div>
            <div className={styles.inputBar}>
                <div className={styles.container_type1}>
                        <p className={styles.heading_type1}>Todo</p>
                    <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                </div>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>Start Date</p>
                    <input type="date" value={searchDate1} onChange={(e)=>setSearchDate1(e.target.value)}/>
                    {/* <input type="text" value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)}/> */}
                </div>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>End Date</p>
                    <input type="date" value={searchDate2} onChange={(e)=>setSearchDate2(e.target.value)}/>
                    {/* <input type="text" value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)}/> */}
                </div>
                <div className={styles.container_type1}>
                    <p className={styles.heading_type1}>Category</p>
                    <select onChange={(e)=>setSearchCategory(e.target.value)}>
                        <option value="all">All</option>
                        {
                            categories.map((cc,i)=>{
                                return(
                                    <option key={i} value={cc}>{cc}</option>
                                )
                            })
                        }
                    </select>
                </div>
                    &nbsp;<button className={styles.btn_type1} onClick={searchTodos}>Search</button>
                    {
                        searchState?<button className={styles.btn_type3} onClick={clearSearch}>Clear</button>:''
                    }
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.cardContainerTitle}>List of TODOs:</div>
                <div className={styles.cards}>
                {
                    data.map((t,inx)=>{
                        return(
                            <div className={styles.card} key={inx}>
                                {
                                    t.status===true?
                                    // <div>
                                    //     <input type="checkbox" onChange={()=>markAsDone(t.id)} checked/>
                                    //     <s> {t.text}, {t.category}, {t.date} </s>{" "}
                                    // </div>
                                    <>
                                        <div className={styles.cardTop}>
                                            <div style={{display:'flex',alignItems:'baseline'}}>
                                                <input className={styles.cardCheckBox} type="checkbox" onChange={()=>markAsDone(t.id)}/>
                                                <p className={styles.cardTitle}><s>{t.text}</s></p>
                                            </div>
                                            <p className={styles.cancelButton} onClick={()=>deleteTodo(t.id)}>+</p>
                                        </div>
                                        <div className={styles.cardBottom}>
                                            <p className={styles.cardCategory}>{t.category}</p>
                                            <p style={{fontSize:'14px'}}>Date: <b>{t.date}</b></p>
                                        </div></>
                                    :
                                    <>
                                        <div className={styles.cardTop}>
                                            <div style={{display:'flex',alignItems:'baseline'}}>
                                                <input className={styles.cardCheckBox} type="checkbox" onChange={()=>markAsDone(t.id)}/>
                                                <p className={styles.cardTitle}>{t.text}</p>
                                            </div>
                                            <p className={styles.cancelButton} onClick={()=>deleteTodo(t.id)}>+</p>
                                        </div>
                                        <div className={styles.cardBottom}>
                                            <p className={styles.cardCategory}>{t.category}</p>
                                            <p style={{fontSize:'14px'}}>Date: <b>{t.date}</b></p>
                                        </div>
                                    </>
                                }
                                {/* <button className={styles.cardBtn} >Delete</button> */}
                            </div>
                        )
                    })
                }
                {
                    data.length>0?'':<p className={styles.noDataFound}>No Data Found!</p>
                }
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);