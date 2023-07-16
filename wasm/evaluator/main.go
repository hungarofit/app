package main

import (
	"fmt"
	"syscall/js"

	hfit "github.com/hungarofit/evaluator"
)

func evaluate(this js.Value, args0 []js.Value) interface{} {
	handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		resolve := args[0]
		reject := args[1]
		go func(args0 []js.Value) {
			var err error
			var pChallenge hfit.Challenge
			var pGender hfit.Gender
			var pAge hfit.Age
			pResults := map[hfit.Exercise]hfit.ResultValue{}
			score := hfit.ChallengeScore{}

			if len(args0) < 4 {
				err = fmt.Errorf("invalid number of parameters, needed 4 (string, int, int, map{})")
			}

			if err == nil {
				pChallenge = hfit.Challenge(args0[0].String())
				pGender = hfit.Gender(args0[1].Int())
				pAge = hfit.Age(args0[2].Int())

				kResults := js.Global().Get("Object").Call("keys", args0[3])
				for i := 0; i < kResults.Length(); i++ {
					key := kResults.Index(i).String()
					val := float32(args0[3].Get(key).Float())
					pResults[hfit.Exercise(key)] = hfit.ResultValue(val)
				}
			}

			score, err = hfit.Evaluate(pChallenge, pGender, pAge, pResults)

			if err != nil {
				errorConstructor := js.Global().Get("Error")
				errorObject := errorConstructor.New(err.Error())
				reject.Invoke(errorObject)
			} else {
				data := map[string]interface{}{}
				data["total"] = float32(score.Total)
				data["total_max"] = float32(score.TotalMax)
				dResults := map[string]interface{}{}
				for k, v := range score.Exercises {
					s := map[string]interface{}{
						"score":     float32(v.Score),
						"score_max": float32(v.ScoreMax),
					}
					dResults[string(k)] = s
				}
				data["results"] = dResults
				resolve.Invoke(js.ValueOf(data))
			}
		}(args0)
		return nil
	})
	promiseConstructor := js.Global().Get("Promise")
	return promiseConstructor.New(handler)
}

func registerCallbacks() {
	g := js.Global().Get("Object").New()
	g.Set("evaluate", js.FuncOf(evaluate))
	js.Global().Set("Hungarofit", g)
}

func main() {
	c := make(chan struct{})
	registerCallbacks()
	println("evaluator WASM loaded")
	<-c
}
