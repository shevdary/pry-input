import {create} from 'zustand';
// @ts-nocheck
import {evaluate} from 'mathjs';

const useStore = create(set => ({
  equation: '',
  result: null,
  setEquation: (equation: any) => set({equation}),
  variables: [],
  setVariables: (variables: any) =>set({variables}),
  calculateResult: () => set((state: { equation: any, variables: []}) => {
    try {
      const val = state.equation.map((item:{value: string})=>item.value);
      const result = evaluate(val.join(''));
      return { result };
    } catch (error: any) {
      return { result: error?.message };
    }
  })
}));

export default useStore;
