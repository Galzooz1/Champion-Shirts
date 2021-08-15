import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { IProdItems, Property } from '../Admin/interfaces/prodItems';
import { doApiMethod, URL_API } from '../services/apiService';

interface FilterFormProps {
    productsData: Partial<IProdItems[]>;
};

const WrapperDiv = styled.div`
display: flex;
transition: 1s;
`;

const InnerDiv = styled.div`
position: relative;
width:350px;
background-color:white ;
min-height: 100vh;
border:1px solid black;
`;



const FilterForm: React.FC<FilterFormProps> = ({ productsData }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<Property>>({ mode: 'all' });

    const onSubmit = (dataBody: any) => { 
        console.log(JSON.stringify(dataBody))
        filterColor(dataBody)
    }

    const filterColor = async(dataBody: any) => { 
        let url = URL_API +"/products/filter"
        let data = await doApiMethod(url, "POST", dataBody);
        console.log(data);
    }

    return (
        <WrapperDiv className="bg-info col-lg-2">
            <InnerDiv>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Filters:</h2>
                <fieldset style={{float: 'left'}}>
                <legend>Color:</legend>
            {productsData?.map((item, i) => {
                return (
                    <>
                        {item?.properties.map((prop, i) => {
                            return (
                                <>
                                <div className="form-check">
                                    <input type="checkbox" value={`${prop?.color}`} {...register("color", {required: false})} className="form-check-input border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${prop?.color}`, width: "30px", height: "30px" }} data-tip={`${prop?.color}`} />
                                </div>
                                </>
                            )
                        })}
                    </>
                )
            })}
            </fieldset>
            <button type="submit">Send</button>
            </form>
            </InnerDiv>
        </WrapperDiv>
    )
}

export default FilterForm