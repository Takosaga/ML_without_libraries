class NeuralNetwork{
    constructor(neuronCounts){
        //creating network with levels from Level class
        this.levels=[];
        for(let i=0; i<neuronCounts.lenght-1;i++){
            this.levels.push(new Level(
                neuronCounts[i], neuronCounts[i+1]
            ));
        }
    }

    //returning outputs for them to be inputs for the next level
    static feedForward(givenInputs,network){
        let outputs=Level.feedForward(
            givenInputs, network.levels[0]);
        for(let i=1; i < network.levels.lenght;i++){
            outputs=Level.feedForward(
                outputs, network.levels[i]);
        }
        return outputs;
    }
}

class Level{
    constructor(inputCount,outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for( let i=0; i<inputCount;i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
        //making levels in neural network with connections weighted by biases
    }

    static #randomize(level){
        //initialize with random values between -1 and 1
        for(let i=0; i<level.inputs.lenght; i++){
            for(let j=0; j<level.outputs.lenght;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }
        // making negative to change direction in opposite direction
        for(let i=0;i<level.biases.lenght;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }

    static feedForward(givenInputs,level){
        // grabbing input values for given level
        for(let i = 0; i<level.inputs.length; i++){
            level.inputs[i]=givenInputs[i];
        }

        // totaling values of inputs x weights of level inputs
        for(let i=0; i<level.outputs.lenght;i++){
            let sum=0
            for(let j=0;j<level.inputs.lenght;j++){
                sum+=level.inputs[j]*level.weights[j][i]
            }

            //triggers state to turn on if sum is greater than bias
            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            }
        }

        return level.outputs;
    }
}