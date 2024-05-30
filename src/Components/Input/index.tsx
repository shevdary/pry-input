// @ts-nocheck

import React, { useState, useMemo, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Space,Card } from 'antd';
import useStore from '../../store/store';
import { useGetValues } from '../../services/formulaService';
import { debounce } from 'lodash';
import MultiValueRemove from '../MultiValueRemove'

const InputComponent = () => {
  const result = useStore((state) => state.result);
  const setEquation = useStore((state) => state.setEquation);
  const setVariables = useStore((state) => state.setVariables);
  const calculateResult = useStore((state) => state.calculateResult);

  const fetchDelay = 500;
  const [skillOptions, setSkillOptions] = useState([]);
  const mutation = useGetValues();
  const fetchRef = useRef(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [val, setVal] = useState([]);
  const [inputValue, setInputValue] = useState('')

  const handleOnSearch = useMemo(() => {
    return debounce((value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      mutation.mutate(value, {
        onSuccess: (items) => {
          if (fetchId !== fetchRef.current) {
            return;
          }
          const filtered = items.filter((item) => !items.includes(item.id));
          setSkillOptions(filtered);
          setVariables(filtered);
        },
      });
    }, fetchDelay);
  }, [fetchDelay, mutation, setVariables]);

  const handleInputChange = (value) => {
    const isAlphabetic = /[a-zA-Z]+$/.test(value);
    const hasMathSymbols = /[+\-*/=]/.test(value);
    let updatedWord = null;
    setInputValue(value)

    if (hasMathSymbols) {
      setIsOpenMenu(false)
      setVal((prevVal,) => [...prevVal, {label: updatedWord || value, value: updatedWord || value}]);
      setInputValue('')
    }

    if (isAlphabetic) {
      setIsOpenMenu(true);
      handleOnSearch(value);
    }
  }

  const onChange = (selectedOptions) => {
    setVal(selectedOptions);
    setIsOpenMenu(false);
  };

  const onBlur = () => {
    if (!!inputValue.length) {
      setVal((prevVal,) => [...prevVal, {label: inputValue, value: inputValue}]);

      setEquation(!!val.length ? [...val, {label: inputValue, value: inputValue}] : [{
        label: inputValue,
        value: inputValue
      }])
      calculateResult()
    }
  }

  return (
    <div>
      <Space direction="vertical" size={24}>
        <Card title={<span>{result || 'Summary'}</span>} style={{ width: 800 }}>
          <div >
            <div >
              <CreatableSelect
                isMulti
                value={val}
                components={{MultiValueRemove}}
                onChange={onChange}
                inputValue={inputValue}
                menuIsOpen={isOpenMenu}
                isClearable
                hideSelectedOptions
                isSearchable
                onBlur={onBlur}
                options={skillOptions.map((item) => ({label: item.name, value: item.value}))}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default InputComponent;
