import CalculatorTabBtn from "../CalculatorTabBtn/CalculatorTabBtn";
import CoverCalcKeto from "../CoverCalc/CoverCalcKeto";
import CoverCalcMacro from "../CoverCalc/CoverCalcMacro";
import KetoCalculator from "../KetoCalculator/KetoCalculator";
import MacroCalculator from "../MacroCalculator/MacroCalculator";

export default function CalculatorMain() {
  return (
    <div className='padding-top'>
      <CalculatorTabBtn />
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          id='pills-home'
          role='tabpanel'
          aria-labelledby='pills-home-tab'>
          <CoverCalcMacro />
          <MacroCalculator />
        </div>
        <div
          className='tab-pane fade'
          id='pills-profile'
          role='tabpanel'
          aria-labelledby='pills-profile-tab'>
          <CoverCalcKeto />
          <KetoCalculator />
        </div>
      </div>
    </div>
  );
}
