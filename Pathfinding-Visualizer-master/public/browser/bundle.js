  (function e(t,n,r)
  {
    function s(o,u)
    {
      if(!n[o])
      {
        if(!t[o])
        {
          var a=typeof require=="function"&&require;
          if(!u&&a)
          return a(o,!0);
          
          if(i)
          return i(o,!0);
          var f=new Error("Cannot find module '"+o+"'");
          throw f.code="MODULE_NOT_FOUND",f
        }
        var l=n[o]={exports:{}};
        t[o][0].call(l.exports,function(e)
                              {
                                  var n=t[o][1][e];
                                  return s(n?n:e)
                                },l,l.exports,e,t,n,r)}return n[o].exports}
                                var i=typeof require=="function"&&require;
                                for(var o=0;o<r.length;o++)
                                s(r[o]);
                              return s})({1:[function(require,module,exports){
const weightedSearchAlgorithm = require("../pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("../pathfindingAlgorithms/unweightedSearchAlgorithm");

function launchAnimations(board, success, type, object, algorithm, heuristic) {
  let nodes = object ? board.objectNodesToAnimate.slice(0) : board.nodesToAnimate.slice(0);
  let speed = board.speed === "fast" ?
    0 : board.speed === "average" ?
      100 : 500;
  let shortestNodes;
  function timeout(index) {
    setTimeout(function () {
      if (index === nodes.length) {
        if (object) {
          board.objectNodesToAnimate = [];
          if (success) {
            board.addShortestPath(board.object, board.start, "object");
            board.clearNodeStatuses();
            let newSuccess;
            if (board.currentAlgorithm === "bidirectional") {

            } else {
              if (type === "weighted") {
                newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, heuristic);
              } else {
                newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
              }
            }
            document.getElementById(board.object).className = "visitedObjectNode";
            launchAnimations(board, newSuccess, type);
            return;
          } else {
            console.log("Failure.");
            board.reset();
            board.toggleButtons();
            return;
          }
        } else {
          board.nodesToAnimate = [];
          if (success) {
            if (document.getElementById(board.target).className !== "visitedTargetNodeBlue") {
              document.getElementById(board.target).className = "visitedTargetNodeBlue";
            }
            if (board.isObject) {
              board.addShortestPath(board.target, board.object);
              board.drawShortestPathTimeout(board.target, board.object, type, "object");
              board.objectShortestPathNodesToAnimate = [];
              board.shortestPathNodesToAnimate = [];
              board.reset("objectNotTransparent");
            } else {
              board.drawShortestPathTimeout(board.target, board.start, type);
              board.objectShortestPathNodesToAnimate = [];
              board.shortestPathNodesToAnimate = [];
              board.reset();
            }
            shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
            return;
          } else {
            console.log("Failure.");
            board.reset();
            board.toggleButtons();
            return;
          }
        }
      } else if (index === 0) {
        if (object) {
          document.getElementById(board.start).className = "visitedStartNodePurple";
        } else {
          if (document.getElementById(board.start).className !== "visitedStartNodePurple") {
            document.getElementById(board.start).className = "visitedStartNodeBlue";
          }
        }
        if (board.currentAlgorithm === "bidirectional") {
          document.getElementById(board.target).className = "visitedTargetNodeBlue";
        }
        change(nodes[index])
      } else if (index === nodes.length - 1 && board.currentAlgorithm === "bidirectional") {
        change(nodes[index], nodes[index - 1], "bidirectional");
      } else {
        change(nodes[index], nodes[index - 1]);
      }
      timeout(index + 1);
    }, speed);
  }
  /*
  This is a JavaScript function that launches animations on a grid-based board. The animations are used to visualize pathfinding algorithms and their results. Here is a step-by-step explanation of what this code does:

The function takes four arguments: board, success, type, object, algorithm, and heuristic.
The board argument is an object that represents the grid-based board that the animations will be displayed on.
The success argument is a boolean value that indicates whether or not the algorithm found a path.
The type argument is a string that indicates whether the algorithm used is weighted or unweighted.
The object argument is a boolean value that indicates whether the algorithm is searching for an object or a target node.
The algorithm argument is a string that represents the type of algorithm used for the search.
The heuristic argument is a string that represents the type of heuristic used for the search (if any).
The function then declares three variables:

nodes - an array of nodes that will be animated.
speed - the speed at which the animations will be displayed.
shortestNodes - an array of nodes representing the shortest path.
The function then declares a nested function called timeout, which takes an index as an argument. This function uses a setTimeout function to animate the nodes on the board. The setTimeout function calls the change function to change the status of a given node on the board. The change function is not defined in this code snippet, but it is assumed to be defined elsewhere in the code.

The timeout function also calls itself recursively with an incremented index until all the nodes in the nodes array have been animated. If index equals the length of nodes, the function will check if the object argument is true. If it is, it will check if success is also true. If it is, it will add the shortest path to the board, clear the node statuses, and launch a new animation with the same board and the new shortest path. If success is false, it will reset the board and stop the animation. If the object argument is false, the function will check if success is true. If it is, it will add the shortest path to the board and stop the animation. If success is false, it will reset the board and stop the animation.

In summary, this code launches an animation of a pathfinding algorithm on a grid-based board, displaying the nodes that the algorithm visits as it searches for a path. It also displays the shortest path that the algorithm found once it has completed its search. The animation speed can be set to "fast", "average", or "slow" depending on the user's preference.


The launchAnimations function then defines a timeout function, which is called recursively with an increasing index until the index is equal to the number of nodes to animate. For each iteration, a timeout is set to delay the execution of the function. The duration of the timeout is determined by the speed of the animation, which is either fast, average, or slow. The timeout function checks if the index is equal to the number of nodes to animate. If so, it checks whether the current animation is for the object or the path and whether the animation was successful.

If the animation was for the object and was successful, the function adds the shortest path from the object to the target, clears the node statuses, and launches the search algorithm to find the shortest path from the start to the target. If the animation was not successful, the function resets the board and stops the animation.

If the animation was for the path and was successful, the function adds the shortest path from the start to the target, draws the shortest path, and resets the board. If the animation was not successful, the function resets the board and stops the animation.

If the index is not equal to the number of nodes to animate, the function changes the class name of the current node to "visited" and the class name of the previous node to "visitedPath" if the algorithm is not bidirectional, or to "visitedBidirectional" if the algorithm is bidirectional. The function then calls the timeout function with an incremented index.

In summary, the launchAnimations function launches the animation of the pathfinding algorithm and handles the timeouts for the animation. The timeout function changes the class names of the nodes to animate and handles the logic for when the animation is complete.


 explain this code line by line:

(function e(t,n,r)
This is the start of a self-executing anonymous function. It takes in three parameters, t, n, and r.
{
  function s(o,u)
  {

 //This creates a function s which takes in two parameters, o and u.//
  if(!n[o])
    {
      if(!t[o])
      {
        var a=typeof require=="function"&&require;
        if(!u&&a)
        return a(o,!0);
        
        if(i)
        return i(o,!0);
        var f=new Error("Cannot find module '"+o+"'");
        throw f.code="MODULE_NOT_FOUND",f
      }
  // This checks if the object o is present in n, which is the exports object for the current module. If it is not present, it checks if o is present in t, which is an object that contains the module's dependencies. If o is present in t, it tries to load the module with the require function. If require is not defined or if u is true, it throws an error..//
        var l=n[o]={exports:{}};
      t[o][0].call(l.exports,function(e)
                             {
                                var n=t[o][1][e];
                                return s(n?n:e)
                              },l,l.exports,e,t,n,r)}return n[o].exports}

                              //If the module is found and loaded successfully, it creates a new exports object for the module and adds it to n. Then it calls the module's first function in t and passes in the exports, a callback function e, the exports object again, the e, t, n, and r objects. It then recursively calls s on the next module in t.//
                              var i=typeof require=="function"&&require;
                              for(var o=0;o<r.length;o++)
                              s(r[o]);
                              return s
})({1:[function(require,module,exports){
//This sets i to require if it is defined, otherwise it is undefined. It then loops through each module in r and calls s on it. Finally, the self-executing anonymous function is called with an object containing the modules, where each module is represented as a key-value pair.

The rest of the code is not part of the self-executing anonymous function, and it appears to be defining a few functions and using them to animate a pathfinding algorithm on a board.//
Line 43: The weightedSearchAlgorithm function is called with several parameters: board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, and heuristic. The results of this function call are assigned to the newSuccess variable.

Line 44: The class name of the HTML element with an ID matching the value of board.object is set to "visitedObjectNode".

Line 45: The launchAnimations function is called with board, newSuccess, and type as parameters. Note that this is a recursive call to launchAnimations.

Line 46: The return statement causes the current execution of the launchAnimations function to end and control to be passed back to the caller.

Lines 47-52: These lines are executed if the search did not find a path to the target. A message is logged to the console, the board object is reset, and the "start" and "target" buttons on the page are re-enabled.

Lines 53-59: These lines are executed if the current animation is for a non-object node (i.e., the "start" or "target"). If the search was successful, the class name of the HTML element with an ID matching the value of board.target is set to "visitedTargetNodeBlue". The shortest path is then drawn on the board, and the objectShortestPathNodesToAnimate and shortestPathNodesToAnimate arrays are concatenated and assigned to the shortestNodes variable.

Lines 60-63: These lines are executed if the search was unsuccessful. A message is logged to the console, the board object is reset, and the "start" and "target" buttons on the page are re-enabled.

Line 64: The timeout function is called with an initial index of 0.

Line 65: The return statement causes the current execution of the launchAnimations function to end and control to be passed back to the caller.

*/

  function change(currentNode, previousNode, bidirectional) {
    let currentHTMLNode = document.getElementById(currentNode.id);
    let relevantClassNames = ["start", "target", "object", "visitedStartNodeBlue", "visitedStartNodePurple", "visitedObjectNode", "visitedTargetNodePurple", "visitedTargetNodeBlue"];
    if (!relevantClassNames.includes(currentHTMLNode.className)) {
      currentHTMLNode.className = !bidirectional ?
        "current" : currentNode.weight === 15 ?
          "visited weight" : "visited";
    }
    if (currentHTMLNode.className === "visitedStartNodePurple" && !object) {
      currentHTMLNode.className = "visitedStartNodeBlue";
    }
    if (currentHTMLNode.className === "target" && object) {
      currentHTMLNode.className = "visitedTargetNodePurple";
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (object) {
          previousHTMLNode.className = previousNode.weight === 15 ? "visitedobject weight" : "visitedobject";
        } else {
          previousHTMLNode.className = previousNode.weight === 15 ? "visited weight" : "visited";
        }
      }
    }
  }
/*
This code defines a JavaScript function called change which takes three parameters: currentNode, previousNode, and bidirectional.

let currentHTMLNode = document.getElementById(currentNode.id); - This line gets the HTML element corresponding to the id of the currentNode passed in as a parameter, and assigns it to the currentHTMLNode variable.

let relevantClassNames = ["start", "target", "object", "visitedStartNodeBlue", "visitedStartNodePurple", "visitedObjectNode", "visitedTargetNodePurple", "visitedTargetNodeBlue"]; - This line creates an array called relevantClassNames that contains the names of the classes that are relevant to the function.

if (!relevantClassNames.includes(currentHTMLNode.className)) { - This line checks if the class name of the currentHTMLNode is not included in the relevantClassNames array.

currentHTMLNode.className = !bidirectional ? "current" : currentNode.weight === 15 ? "visited weight" : "visited"; - If the class name of the currentHTMLNode is not included in the relevantClassNames array, this line sets the class name of the currentHTMLNode to "current" if bidirectional is false, and to "visited weight" if bidirectional is true and the currentNode has a weight of 15, otherwise it sets the class name to "visited".

if (currentHTMLNode.className === "visitedStartNodePurple" && !object) { - This line checks if the class name of the currentHTMLNode is "visitedStartNodePurple" and object is false.

currentHTMLNode.className = "visitedStartNodeBlue"; - If the condition in line 5 is true, this line sets the class name of the currentHTMLNode to "visitedStartNodeBlue".

if (currentHTMLNode.className === "target" && object) { - This line checks if the class name of the currentHTMLNode is "target" and object is true.

currentHTMLNode.className = "visitedTargetNodePurple"; - If the condition in line 7 is true, this line sets the class name of the currentHTMLNode to "visitedTargetNodePurple".

if (previousNode) { - This line checks if previousNode is truthy (i.e., it is not null or undefined).

let previousHTMLNode = document.getElementById(previousNode.id); - If the condition in line 9 is true, this line gets the HTML element corresponding to the id of the previousNode, and assigns it to the previousHTMLNode variable.

if (!relevantClassNames.includes(previousHTMLNode.className)) { - This line checks if the class name of the previousHTMLNode is not included in the relevantClassNames array.

if (object) { - This line checks if object is true.

previousHTMLNode.className = previousNode.weight === 15 ? "visitedobject weight" : "visitedobject"; - If the condition in line 12 is true, this line sets the class name of the previousHTMLNode to "visitedobject weight" if the previousNode has a weight of 15, otherwise it sets the class name to "visitedobject".

} else { - If the condition in line 12 is false, this line executes.

`previousHTMLNode.className = previousNode.weight ===
if (!relevantClassNames.includes(currentHTMLNode.className)): This line checks if the current node's class name is not in the relevantClassNames array. If it's not, it proceeds to the next line, otherwise it skips over it. The relevantClassNames array contains the names of classes that are used to style the various nodes on the grid, such as the start node, target node, object node, and visited nodes.

currentHTMLNode.className = !bidirectional ? "current" : currentNode.weight === 15 ? "visited weight" : "visited";: This line sets the class name of the current HTML node based on the state of the algorithm. If bidirectional is false, it sets the class name to "current". Otherwise, it checks if the current node's weight is 15 (which means it has been marked as a weighted node), and if so, it sets the class name to "visited weight". Otherwise, it sets the class name to "visited".

if (currentHTMLNode.className === "visitedStartNodePurple" && !object) { currentHTMLNode.className = "visitedStartNodeBlue"; }: This line checks if the current node is a visited start node with the class name "visitedStartNodePurple" and there is no object node. If both conditions are true, it sets the class name to "visitedStartNodeBlue".

if (currentHTMLNode.className === "target" && object) { currentHTMLNode.className = "visitedTargetNodePurple"; }: This line checks if the current node is the target node and there is an object node. If both conditions are true, it sets the class name to "visitedTargetNodePurple".

if (previousNode) { let previousHTMLNode = document.getElementById(previousNode.id); ... }: This line checks if there is a previous node (i.e., we are not at the start of the algorithm), and if so, it gets the HTML element for the previous node using its ID.

if (!relevantClassNames.includes(previousHTMLNode.className)) { ... }: This line checks if the previous node's class name is not in the relevantClassNames array. If it's not, it proceeds to the next line, otherwise it skips over it.

if (object) { previousHTMLNode.className = previousNode.weight === 15 ? "visitedobject weight" : "visitedobject"; } else { previousHTMLNode.className = previousNode.weight === 15 ? "visited weight" : "visited"; }: This line sets the class name of the previous HTML node based on whether there is an object node. If there is, it checks if the previous node's weight is 15 and sets the class name to "visitedobject weight" if so, otherwise it sets it to "visitedobject". If there is no object node, it does the same thing but with the class names "visited weight" and "visited".





*/ 
  function shortestPathTimeout(index) {
    setTimeout(function () {
      if (index === shortestNodes.length){
        board.reset();
        if (object) {
          shortestPathChange(board.nodes[board.target], shortestNodes[index - 1]);
          board.objectShortestPathNodesToAnimate = [];
          board.shortestPathNodesToAnimate = [];
          board.clearNodeStatuses();
          let newSuccess;
          if (type === "weighted") {
            newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
          } else {
            newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
          }
          launchAnimations(board, newSuccess, type);
          return;
        } else {
          shortestPathChange(board.nodes[board.target], shortestNodes[index - 1]);
          board.objectShortestPathNodesToAnimate = [];
          board.shortestPathNodesToAnimate = [];
          return;
        }
      } else if (index === 0) {
        shortestPathChange(shortestNodes[index])
      } else {
        shortestPathChange(shortestNodes[index], shortestNodes[index - 1]);
      }
      shortestPathTimeout(index + 1);
    }, 40);
  }
/*This is a function named shortestPathTimeout that takes a single parameter called index. It is used to animate the shortest path nodes one by one by using the setTimeout method.

Here's what the code does line by line:

setTimeout(function () {...}, 40);: This sets a timeout of 40ms and then executes the function passed to it. This function will be called repeatedly until the if statement inside it evaluates to true.

if (index === shortestNodes.length){...}: This checks if the index parameter is equal to the length of shortestNodes, which is an array containing the nodes that make up the shortest path. If this is true, it means that all the shortest path nodes have been animated, and the board is reset to its original state. If the object variable is true, then the board is searched again for a new shortest path. Otherwise, the animation ends.

else if (index === 0) {...}: This checks if the index parameter is equal to 0. If this is true, it means that the first node in the shortest path is being animated. The shortestPathChange function is called with only one parameter, which is the first node in the path.

else {...}: If neither of the above conditions is true, it means that an intermediate node in the shortest path is being animated. The shortestPathChange function is called with two parameters: the current node being animated (shortestNodes[index]) and the previous node that was animated (shortestNodes[index - 1]).

shortestPathTimeout(index + 1);: This calls the shortestPathTimeout function again with the index parameter incremented by 1. This causes the function to continue animating the shortest path nodes until the if statement evaluates to true.

*/
  function shortestPathChange(currentNode, previousNode) {
    let currentHTMLNode = document.getElementById(currentNode.id);
    if (type === "unweighted") {
      currentHTMLNode.className = "shortest-path-unweighted";
    } else {
      if (currentNode.direction === "up") {
        currentHTMLNode.className = "shortest-path-up";
      } else if (currentNode.direction === "down") {
        currentHTMLNode.className = "shortest-path-down";
      } else if (currentNode.direction === "right") {
        currentHTMLNode.className = "shortest-path-right";
      } else if (currentNode.direction === "left") {
        currentHTMLNode.className = "shortest-path-left";
      } else if (currentNode.direction = "down-right") {
        currentHTMLNode.className = "wall"
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className = "shortest-path";
    } else {
      let element = document.getElementById(board.start);
      element.className = "shortest-path";
      element.removeAttribute("style");
    }
  }

  timeout(0);

};
/*
This is a function called shortestPathChange that is responsible for changing the class name of HTML elements to visualize the shortest path in the grid. The function takes two arguments, currentNode and previousNode, which represent the current node being animated and the previous node that was animated in the shortest path.

The first thing the function does is get the current HTML node by its ID and store it in a variable called currentHTMLNode. Then it checks the value of type to determine whether the grid is weighted or unweighted. If the grid is unweighted, it changes the class name of currentHTMLNode to "shortest-path-unweighted". If the grid is weighted, it checks the value of currentNode.direction to determine the direction of the shortest path. If the direction is "up", "down", "right", or "left", it changes the class name of currentHTMLNode to "shortest-path-up", "shortest-path-down", "shortest-path-right", or "shortest-path-left", respectively. If the direction is "down-right", it means that a diagonal wall is present, so the class name of currentHTMLNode is set to "wall".

If previousNode is not null, it means that there is a previous node in the shortest path that needs to be animated as well. In this case, the function gets the previous HTML node by its ID and sets its class name to "shortest-path". If previousNode is null, it means that the current node is the start node, so the function gets the HTML element with the ID equal to board.start, which is the ID of the start node, and sets its class name to "shortest-path". Additionally, it removes any style attribute that was added to the start node during the search algorithm.

Finally, the function calls timeout(0) to start the animation of the shortest path. The timeout function is defined outside of shortestPathChange and is responsible for animating the shortest path one node at a time with a delay of 40 milliseconds between each node.
line by line 
function shortestPathChange(currentNode, previousNode) {
  This line declares a function called shortestPathChange that takes two parameters: currentNode and previousNode.

  let currentHTMLNode = document.getElementById(currentNode.id);

  This line retrieves the HTML element with the ID matching the id property of currentNode.
  if (type === "unweighted") {
  currentHTMLNode.className = "shortest-path-unweighted";
} else {
  if (currentNode.direction === "up") {
    currentHTMLNode.className = "shortest-path-up";
  } else if (currentNode.direction === "down") {
    currentHTMLNode.className = "shortest-path-down";
  } else if (currentNode.direction === "right") {
    currentHTMLNode.className = "shortest-path-right";
  } else if (currentNode.direction === "left") {
    currentHTMLNode.className = "shortest-path-left";
  } else if (currentNode.direction = "down-right") {
    currentHTMLNode.className = "wall"
  }
}
This conditional block checks whether the type variable is equal to "unweighted". If it is, it sets the className of currentHTMLNode to "shortest-path-unweighted". If it isn't, it checks the direction property of currentNode and sets the className of currentHTMLNode accordingly. If currentNode.direction is equal to "down-right", it sets the className to "wall".

if (previousNode) {
  let previousHTMLNode = document.getElementById(previousNode.id);
  previousHTMLNode.className = "shortest-path";
} else {
  let element = document.getElementById(board.start);
  element.className = "shortest-path";
  element.removeAttribute("style");
}

This conditional block checks whether previousNode is defined. If it is, it retrieves the HTML element with the ID matching the id property of previousNode and sets its className to "shortest-path". If it isn't, it retrieves the HTML element with the ID matching board.start and sets its className to "shortest-path". It also removes any inline styles from the element by calling removeAttribute("style").

timeout(0);

};

This line calls a function called timeout with an argument of 0, which schedules the function to be executed as soon as possible. It also closes the shortestPathChange function definition.
*/
module.exports = launchAnimations;

},{"../pathfindingAlgorithms/unweightedSearchAlgorithm":15,"../pathfindingAlgorithms/weightedSearchAlgorithm":16}],2:[function(require,module,exports){
const weightedSearchAlgorithm = require("../pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("../pathfindingAlgorithms/unweightedSearchAlgorithm");

function launchInstantAnimations(board, success, type, object, algorithm, heuristic) {
  let nodes = object ? board.objectNodesToAnimate.slice(0) : board.nodesToAnimate.slice(0);
  let shortestNodes;
  for (let i = 0; i < nodes.length; i++) {
    if (i === 0) {
      change(nodes[i]);
    } else {
      change(nodes[i], nodes[i - 1]);
    }
  }
  if (object) {
    board.objectNodesToAnimate = [];
    if (success) {
      board.drawShortestPath(board.object, board.start, "object");
      board.clearNodeStatuses();
      let newSuccess;
      if (type === "weighted") {
        newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, heuristic);
      } else {
        newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
      }
      launchInstantAnimations(board, newSuccess, type);
      shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
    } else {
      console.log("Failure.");
      board.reset();
      return;
    }
  } else {
    board.nodesToAnimate = [];
    if (success) {
      if (board.isObject) {
        board.drawShortestPath(board.target, board.object);
      } else {
        board.drawShortestPath(board.target, board.start);
      }
      shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
    } else {
      console.log("Failure");
      board.reset();
      return;
    }
  }

  let j;
  for (j = 0; j < shortestNodes.length; j++) {
    if (j === 0) {
      shortestPathChange(shortestNodes[j]);
    } else {
      shortestPathChange(shortestNodes[j], shortestNodes[j - 1]);
    }
  }
  board.reset();
  if (object) {
    shortestPathChange(board.nodes[board.target], shortestNodes[j - 1]);
    board.objectShortestPathNodesToAnimate = [];
    board.shortestPathNodesToAnimate = [];
    board.clearNodeStatuses();
    let newSuccess;
    if (type === "weighted") {
      newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
    } else {
      newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
    }
    launchInstantAnimations(board, newSuccess, type);
  } else {
    shortestPathChange(board.nodes[board.target], shortestNodes[j - 1]);
    board.objectShortestPathNodesToAnimate = [];
    board.shortestPathNodesToAnimate = [];
  }

  function change(currentNode, previousNode) {
    let currentHTMLNode = document.getElementById(currentNode.id);
    let relevantClassNames = ["start", "shortest-path", "instantshortest-path", "instantshortest-path weight"];
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (object) {
          previousHTMLNode.className = previousNode.weight === 15 ? "instantvisitedobject weight" : "instantvisitedobject";
        } else {
          previousHTMLNode.className = previousNode.weight === 15 ? "instantvisited weight" : "instantvisited";
        }
      }
    }
  }

  function shortestPathChange(currentNode, previousNode) {
    let currentHTMLNode = document.getElementById(currentNode.id);
    if (type === "unweighted") {
      currentHTMLNode.className = "shortest-path-unweighted";
    } else {
      if (currentNode.direction === "up") {
        currentHTMLNode.className = "shortest-path-up";
      } else if (currentNode.direction === "down") {
        currentHTMLNode.className = "shortest-path-down";
      } else if (currentNode.direction === "right") {
        currentHTMLNode.className = "shortest-path-right";
      } else if (currentNode.direction === "left") {
        currentHTMLNode.className = "shortest-path-left";
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className = previousNode.weight === 15 ? "instantshortest-path weight" : "instantshortest-path";
    } else {
      let element = document.getElementById(board.start);
      element.className = "startTransparent";
    }
  }

};
/*
This code exports a function called launchInstantAnimations which animates the pathfinding algorithm on a grid. It takes in several arguments, including board, which is an object containing information about the grid, such as the start and end points and the nodes on the grid, success, which is a boolean indicating whether or not the algorithm was able to find a path, type, which is a string indicating the type of algorithm used (weighted or unweighted), object, which is a boolean indicating whether or not an object was placed on the grid, algorithm, which is a string indicating the name of the algorithm used, and heuristic, which is a string indicating the name of the heuristic function used (if any).

The function first creates a copy of the nodes to be animated, either the nodesToAnimate or objectNodesToAnimate, depending on whether or not an object was placed on the grid. It then iterates through each node in the array, calling the change function to animate the node. The change function takes in a currentNode and an optional previousNode argument, and changes the class name of the HTML element corresponding to the node based on the type of animation being performed.

If an object was placed on the grid and the algorithm was successful, the function then draws the shortest path between the object and the start or end point (depending on whether the start or end point is the object's target). It then clears the node statuses, calculates the new success status based on the type of algorithm used, and recursively calls launchInstantAnimations with the new success status. It also concatenates the objectShortestPathNodesToAnimate and shortestPathNodesToAnimate arrays to create an array of nodes representing the shortest path.

If an object was not placed on the grid and the algorithm was successful, the function simply draws the shortest path between the start and end points and concatenates the objectShortestPathNodesToAnimate and shortestPathNodesToAnimate arrays to create an array of nodes representing the shortest path.

The function then iterates through each node in the array of shortest path nodes, calling the shortestPathChange function to animate the node. The shortestPathChange function takes in a currentNode and an optional previousNode argument, and changes the class name of the HTML element corresponding to the node based on the type of animation being performed.

Finally, the function resets the board and clears the objectShortestPathNodesToAnimate and shortestPathNodesToAnimate arrays, and if an object was placed on the grid and the algorithm was successful, it recursively calls launchInstantAnimations again with the new success status to animate the object's path.



*/
module.exports = launchInstantAnimations;

},{"../pathfindingAlgorithms/unweightedSearchAlgorithm":15,"../pathfindingAlgorithms/weightedSearchAlgorithm":16}],3:[function(require,module,exports){
function mazeGenerationAnimations(board) {
  let nodes = board.wallsToAnimate.slice(0);
  let speed = board.speed === "fast" ?
    5 : board.speed === "average" ?
      25 : 75;
  function timeout(index) {
    setTimeout(function () {
        if (index === nodes.length){
          board.wallsToAnimate = [];
          board.toggleButtons();
          return;
        }
        nodes[index].className = board.nodes[nodes[index].id].weight === 15 ? "unvisited weight" : "wall";
        timeout(index + 1);
    }, speed);
  }

  timeout(0);
};
/*
Here's a detailed explanation of each line of code:


const weightedSearchAlgorithm = require("../pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("../pathfindingAlgorithms/unweightedSearchAlgorithm");
These lines import the weightedSearchAlgorithm and unweightedSearchAlgorithm functions from their respective files, which are located in the ../pathfindingAlgorithms directory.


function launchInstantAnimations(board, success, type, object, algorithm, heuristic) {
This line declares a function named launchInstantAnimations that takes in six parameters: board, success, type, object, algorithm, and heuristic. This function will be responsible for animating the search algorithm.


let nodes = object ? board.objectNodesToAnimate.slice(0) : board.nodesToAnimate.slice(0);
This line creates a new variable nodes that is assigned either board.objectNodesToAnimate or board.nodesToAnimate, depending on the truthiness of object. If object is truthy, board.objectNodesToAnimate is assigned to nodes; otherwise, board.nodesToAnimate is assigned to nodes. The .slice(0) method is called to create a new copy of the array, rather than just a reference to the original array.


let shortestNodes;
This line declares a new variable shortestNodes without assigning it a value.


for (let i = 0; i < nodes.length; i++) {
  if (i === 0) {
    change(nodes[i]);
  } else {
    change(nodes[i], nodes[i - 1]);
  }
}
This is a for loop that iterates through each element of nodes. On each iteration, it calls the change function with either the current node or both the current node and the previous node, depending on whether it is the first iteration or not. This function is responsible for animating the search algorithm.


if (object) {
  board.objectNodesToAnimate = [];
  if (success) {
    board.drawShortestPath(board.object, board.start, "object");
    board.clearNodeStatuses();
    let newSuccess;
    if (type === "weighted") {
      newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, heuristic);
    } else {
      newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
    }
    launchInstantAnimations(board, newSuccess, type);
    shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
  } else {
    console.log("Failure.");
    board.reset();
    return;
  }
} else {
  board.nodesToAnimate = [];
  if (success) {
    if (board.isObject) {
      board.drawShortestPath(board.target, board.object);
    } else {
      board.drawShortestPath(board.target, board.start);
    }
    shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
  } else {
    console.log("Failure");
    board.reset();
    return;
  }
}
This is a conditional block that checks whether object is truthy. If it is, it clears board.objectNodesToAnimate and checks whether success is truthy. If success is truthy, it draws the shortest path from the object to the start node, clears the node statuses on the board, runs the appropriate search algorithm based on the `type */
module.exports = mazeGenerationAnimations;

},{}],4:[function(require,module,exports){
const Node = require("./node");
const launchAnimations = require("./animations/launchAnimations");
const launchInstantAnimations = require("./animations/launchInstantAnimations");
const mazeGenerationAnimations = require("./animations/mazeGenerationAnimations");
const weightedSearchAlgorithm = require("./pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("./pathfindingAlgorithms/unweightedSearchAlgorithm");
const recursiveDivisionMaze = require("./mazeAlgorithms/recursiveDivisionMaze");
const otherMaze = require("./mazeAlgorithms/otherMaze");
const otherOtherMaze = require("./mazeAlgorithms/otherOtherMaze");
const astar = require("./pathfindingAlgorithms/astar");
const stairDemonstration = require("./mazeAlgorithms/stairDemonstration");
const weightsDemonstration = require("./mazeAlgorithms/weightsDemonstration");
const simpleDemonstration = require("./mazeAlgorithms/simpleDemonstration");
const bidirectional = require("./pathfindingAlgorithms/bidirectional");
const getDistance = require("./getDistance");
/*
This code is a JavaScript file that exports a module called module.exports. This module exports an object named mazeGenerationAnimations.

Moving on to the next part, the code imports several other JavaScript files using the require function. These imported files contain functions, classes, or objects that are needed by the mazeGenerationAnimations module.

The first imported file is called Node. This is likely a class that defines a node or a point in a grid. It could have properties like x and y coordinates, a reference to its neighbors, or other useful data.

The next three imports are all animation modules: launchAnimations, launchInstantAnimations, and mazeGenerationAnimations. These modules contain functions that handle animations for certain events. For example, launchAnimations might handle the animation of launching an application or game.

The next two imports are weightedSearchAlgorithm and unweightedSearchAlgorithm. These modules contain functions that define algorithms for finding paths on a grid. Weighted algorithms may consider additional factors like distance, while unweighted algorithms may simply consider the presence or absence of walls.

The following three imports are recursiveDivisionMaze, otherMaze, and otherOtherMaze. These are modules that contain functions for generating mazes on a grid. Each module may implement a different algorithm or approach for generating the maze.

The next import is astar, which is a module that contains a function for running the A* pathfinding algorithm. This algorithm is commonly used for finding the shortest path between two points on a grid.

The next three imports are stairDemonstration, weightsDemonstration, and simpleDemonstration. These modules contain functions that generate specific types of mazes or pathfinding scenarios, likely used for demonstration or testing purposes.

The final import is bidirectional, which is a module that contains a function for running a bidirectional search algorithm. This algorithm is used for finding the shortest path between two points on a grid, but it searches from both the starting and ending points simultaneously.

The last imported module is getDistance. This module likely contains a function for calculating the distance between two points on a grid, which is a common operation in pathfinding algorithms.

Overall, this code is a collection of modules and functions that can be used to generate mazes and find paths on a grid. It includes various algorithms and animations to handle different scenarios and use cases.
 */

function Board(height, width) {
  this.height = height;
  this.width = width;
  this.start = null;
  this.target = null;
  this.object = null;
  this.boardArray = [];
  this.nodes = {};
  this.nodesToAnimate = [];
  this.objectNodesToAnimate = [];
  this.shortestPathNodesToAnimate = [];
  this.objectShortestPathNodesToAnimate = [];
  this.wallsToAnimate = [];
  this.mouseDown = false;
  this.pressedNodeStatus = "normal";
  this.previouslyPressedNodeStatus = null;
  this.previouslySwitchedNode = null;
  this.previouslySwitchedNodeWeight = 0;
  this.keyDown = false;
  this.algoDone = false;
  this.currentAlgorithm = null;
  this.currentHeuristic = null;
  this.numberOfObjects = 0;
  this.isObject = false;
  this.buttonsOn = false;
  this.speed = "fast";
}
/*
This code defines a constructor function called Board that creates a board object with various properties and methods related to pathfinding and maze generation.

The constructor function takes two arguments, height and width, which specify the dimensions of the board. These values are stored in the height and width properties of the object.

The object has several other properties, including:

start: a property that stores the starting node of the pathfinding algorithm.
target: a property that stores the target node of the pathfinding algorithm.
object: a property that stores any additional objects that need to be navigated around during pathfinding.
boardArray: an empty array that will store the nodes on the board.
nodes: an empty object that will store information about the nodes on the board.
nodesToAnimate: an empty array that will store the nodes that need to be animated during the pathfinding algorithm.
objectNodesToAnimate: an empty array that will store the object nodes that need to be animated during the pathfinding algorithm.
shortestPathNodesToAnimate: an empty array that will store the nodes that are part of the shortest path found during the pathfinding algorithm.
objectShortestPathNodesToAnimate: an empty array that will store the object nodes that are part of the shortest path found during the pathfinding algorithm.
wallsToAnimate: an empty array that will store the nodes that have been marked as walls during maze generation.
mouseDown: a boolean that is used to track whether the mouse button is currently pressed down.
pressedNodeStatus: a string that stores the status of the most recently pressed node (either "normal", "start", "target", "object", or "wall").
previouslyPressedNodeStatus: a string that stores the status of the node that was most recently pressed before the current one.
previouslySwitchedNode: a node object that stores the node that was most recently switched (i.e. had its status changed).
previouslySwitchedNodeWeight: a number that stores the weight of the most recently switched node.
keyDown: a boolean that is used to track whether a key on the keyboard is currently pressed down.
algoDone: a boolean that is used to track whether the pathfinding algorithm has finished running.
currentAlgorithm: a string that stores the name of the current pathfinding algorithm being used.
currentHeuristic: a string that stores the name of the current heuristic function being used.
numberOfObjects: a number that stores the current number of objects on the board.
isObject: a boolean that is used to track whether an object is currently being placed on the board.
buttonsOn: a boolean that is used to track whether any buttons on the UI are currently active.
speed: a string that stores the current speed setting for the pathfinding algorithm (either "fast" or "slow").
These properties are used to store information about the board and its state throughout the pathfinding and maze generation processes.
*/

Board.prototype.initialise = function() {
  this.createGrid();
  this.addEventListeners();
  this.toggleTutorialButtons();
};
/*
This code defines a function called initialise on the Board prototype.

The Board prototype is an object that contains shared properties and methods that are inherited by all instances of the Board constructor function.

The initialise function has three main steps:

this.createGrid(); - calls the createGrid method on the Board instance. This method is responsible for creating the game board and initializing it with all the necessary components such as cells, borders, and other UI elements.

this.addEventListeners(); - calls the addEventListeners method on the Board instance. This method is responsible for attaching event listeners to various UI elements on the game board, such as the cells, buttons, or other interactive elements.

this.toggleTutorialButtons(); - calls the toggleTutorialButtons method on the Board instance. This method is responsible for showing or hiding tutorial buttons or other elements on the game board based on the current state of the game.

Overall, this code initializes the game board and its associated components, attaches event listeners to the board, and updates the UI based on the current game state. It is likely part of a larger program or game that uses an object-oriented approach to manage its state and functionality.
 */

Board.prototype.createGrid = function() {
  let tableHTML = "";
  for (let r = 0; r < this.height; r++) {
    let currentArrayRow = [];
    let currentHTMLRow = `<tr id="row ${r}">`;
    for (let c = 0; c < this.width; c++) {
      let newNodeId = `${r}-${c}`, newNodeClass, newNode;
      if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
        newNodeClass = "start";
        this.start = `${newNodeId}`;
      } else if (r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)) {
        newNodeClass = "target";
        this.target = `${newNodeId}`;
      } else {
        newNodeClass = "unvisited";
      }
      newNode = new Node(newNodeId, newNodeClass);
      currentArrayRow.push(newNode);
      currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
      this.nodes[`${newNodeId}`] = newNode;
    }
    this.boardArray.push(currentArrayRow);
    tableHTML += `${currentHTMLRow}</tr>`;
  }
  let board = document.getElementById("board");
  board.innerHTML = tableHTML;
};
/*This code defines a function called createGrid on the Board prototype. This function is responsible for creating and initializing the game board grid.

The function begins by initializing a variable called tableHTML to an empty string. This variable will be used to build the HTML table that represents the game board.

The function then loops over the height and width of the game board, creating a row and a column for each cell in the grid. For each row, the function initializes an empty array called currentArrayRow to hold the nodes in that row. It also initializes a string called currentHTMLRow to hold the HTML code for that row.

For each cell in the row, the function creates a new Node object and pushes it onto the currentArrayRow array. The Node constructor takes two arguments: newNodeId and newNodeClass. newNodeId is a unique identifier for the node, and newNodeClass is the CSS class that determines how the node should be displayed on the game board.

The function then adds the newNode object to the nodes object on the Board instance, using the newNodeId as the key.

Depending on the position of the cell, the function sets the newNodeClass to either "start", "target", or "unvisited". If the cell is in the middle row and the first quarter column of the grid, it is the start node. If it is in the middle row and the third quarter column of the grid, it is the target node. Otherwise, it is an unvisited node.

The function then adds the newNodeClass to the currentHTMLRow string as a class attribute for the td element that represents the cell on the game board.

After looping through all of the cells in the row, the function adds the currentArrayRow array to the boardArray array on the Board instance. This array will hold all of the nodes in the game board grid, arranged in rows and columns.

Finally, the function adds the currentHTMLRow string to the tableHTML string, and closes the tr element for that row.

After looping through all of the rows and columns in the game board, the function sets the innerHTML property of the board element in the HTML file to the tableHTML string. This updates the game board in the UI to show the newly created grid.

Overall, this function is an essential part of creating and initializing the game board grid and populating it with nodes. */

Board.prototype.addEventListeners = function() {
  let board = this;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      let currentId = `${r}-${c}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
      currentElement.onmousedown = (e) => {
        e.preventDefault();
        if (this.buttonsOn) {
          board.mouseDown = true;
          if (currentNode.status === "start" || currentNode.status === "target" || currentNode.status === "object") {
            board.pressedNodeStatus = currentNode.status;
          } else {
            board.pressedNodeStatus = "normal";
            board.changeNormalNode(currentNode);
          }
        }
      }
      currentElement.onmouseup = () => {
        if (this.buttonsOn) {
          board.mouseDown = false;
          if (board.pressedNodeStatus === "target") {
            board.target = currentId;
          } else if (board.pressedNodeStatus === "start") {
            board.start = currentId;
          } else if (board.pressedNodeStatus === "object") {
            board.object = currentId;
          }
          board.pressedNodeStatus = "normal";
        }
      }
      currentElement.onmouseenter = () => {
        if (this.buttonsOn) {
          if (board.mouseDown && board.pressedNodeStatus !== "normal") {
            board.changeSpecialNode(currentNode);
            if (board.pressedNodeStatus === "target") {
              board.target = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "start") {
              board.start = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "object") {
              board.object = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            }
          } else if (board.mouseDown) {
            board.changeNormalNode(currentNode);
          }
        }
      }
      currentElement.onmouseleave = () => {
        if (this.buttonsOn) {
          if (board.mouseDown && board.pressedNodeStatus !== "normal") {
            board.changeSpecialNode(currentNode);
          }
        }
      }
    }
  }
};
/*
This code adds event listeners to each of the grid cells in the board. The purpose of the event listeners is to allow the user to interact with the board, changing the status of individual nodes, such as setting the start and target nodes, and adding or removing obstacles.

The code loops through all the rows and columns in the board and gets the current node and element associated with each cell. For each element, it adds an event listener for three events: mousedown, mouseup, and mouseenter, and a final event listener for mouseleave.

The mousedown event listener sets a flag indicating that the mouse button has been pressed and saves the status of the current node, which can be "start", "target", "object", or "normal". If the status is not a special status (start, target, or object), the status is set to "normal" and the changeNormalNode() method is called to update the appearance of the node.

The mouseup event listener sets the flag indicating that the mouse button has been released and updates the appropriate special status (start, target, or object) if it was changed during the drag operation.

The mouseenter event listener updates the status of the current node if the mouse button is pressed and the status is not "normal". If the status is a special status, such as "start" or "target", it updates the corresponding special status variable and calls redoAlgorithm() if the algorithm has already been run. If the status is "normal", it calls changeNormalNode() to update the appearance of the node.

The mouseleave event listener updates the status of the current node if the mouse button is pressed and the status is not "normal". If the status is a special status, such as "start" or "target", it updates the appearance of the node to indicate that it is no longer selected. 
ure, here's an explanation of the code line by line:


Board.prototype.addEventListeners = function() {
This creates a new method called addEventListeners on the Board prototype.


  let board = this;
This creates a new variable board and assigns it to the value of this, which refers to the current Board object.

javascript
Copy code
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      let currentId = `${r}-${c}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
This loops through each row and column in the grid, gets the corresponding Node object from the Board using the getNode method, and gets the corresponding HTML element using document.getElementById.


      currentElement.onmousedown = (e) => {
        e.preventDefault();
        if (this.buttonsOn) {
          board.mouseDown = true;
          if (currentNode.status === "start" || currentNode.status === "target" || currentNode.status === "object") {
            board.pressedNodeStatus = currentNode.status;
          } else {
            board.pressedNodeStatus = "normal";
            board.changeNormalNode(currentNode);
          }
        }
      }
This sets up an event listener for when the user presses down the mouse button on a grid cell. If the buttonsOn property is true (indicating that the user is currently in button mode), it sets mouseDown to true and determines the status of the node that was clicked. If it's a special node (start, target, or object), it sets pressedNodeStatus to the node's status. Otherwise, it sets pressedNodeStatus to "normal" and changes the node's status to "wall" using the changeNormalNode method.


      currentElement.onmouseup = () => {
        if (this.buttonsOn) {
          board.mouseDown = false;
          if (board.pressedNodeStatus === "target") {
            board.target = currentId;
          } else if (board.pressedNodeStatus === "start") {
            board.start = currentId;
          } else if (board.pressedNodeStatus === "object") {
            board.object = currentId;
          }
          board.pressedNodeStatus = "normal";
        }
      }
This sets up an event listener for when the user releases the mouse button on a grid cell. If the buttonsOn property is true, it sets mouseDown to false and updates the corresponding special node property (start, target, or object) based on the value of pressedNodeStatus.


      currentElement.onmouseenter = () => {
        if (this.buttonsOn) {
          if (board.mouseDown && board.pressedNodeStatus !== "normal") {
            board.changeSpecialNode(currentNode);
            if (board.pressedNodeStatus === "target") {
              board.target = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "start") {
              board.start = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "object") {
              board.object = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            }
          } else if (board.mouseDown) {
            board.changeNormalNode(currentNode);
          }
        }
     */

Board.prototype.getNode = function(id) {
  let coordinates = id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  return this.boardArray[r][c];
};
/*
This code defines a method getNode for a Board object. The method takes a string parameter id, which is expected to be in the format of "row-column", where row and column are integers representing the coordinates of a node in the board.

The method first splits the id parameter using the "-" separator to obtain an array coordinates with two string elements, one for row and the other for column. Then, it converts each element to an integer using parseInt() function and assigns them to the variables r and c respectively.

Next, the method returns the node located at the rth row and cth column of the boardArray property of the Board object. This is done by using the bracket notation to access the rth element of the boardArray, which is an array containing the nodes in that row, and then accessing the cth element of that array to obtain the node at the specified coordinates.

Overall, the purpose of this method is to provide an easy way to access a node object in the boardArray property of the Board object given its coordinates in the format of "row-column".



} currentNode 
 */
Board.prototype.changeSpecialNode = function(currentNode) {
  let element = document.getElementById(currentNode.id), previousElement;
  if (this.previouslySwitchedNode) previousElement = document.getElementById(this.previouslySwitchedNode.id);
  if (currentNode.status !== "target" && currentNode.status !== "start" && currentNode.status !== "object") {
    if (this.previouslySwitchedNode) {
      this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
      previousElement.className = this.previouslySwitchedNodeWeight === 15 ?
      "unvisited weight" : this.previouslyPressedNodeStatus;
      this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15 ?
      15 : 0;
      this.previouslySwitchedNode = null;
      this.previouslySwitchedNodeWeight = currentNode.weight;

      this.previouslyPressedNodeStatus = currentNode.status;
      element.className = this.pressedNodeStatus;
      currentNode.status = this.pressedNodeStatus;

      currentNode.weight = 0;
    }
  } else if (currentNode.status !== this.pressedNodeStatus && !this.algoDone) {
    this.previouslySwitchedNode.status = this.pressedNodeStatus;
    previousElement.className = this.pressedNodeStatus;
  } else if (currentNode.status === this.pressedNodeStatus) {
    this.previouslySwitchedNode = currentNode;
    element.className = this.previouslyPressedNodeStatus;
    currentNode.status = this.previouslyPressedNodeStatus;
  }
};
/*This code defines a method called changeSpecialNode on the Board prototype. This method is responsible for changing the status and weight of a node on the board based on user interactions.

The method takes one argument, currentNode, which represents the node that the user is currently interacting with. The method first retrieves the HTML element associated with currentNode and stores it in a variable called element. It also checks if there is a previously switched node (a node that was previously changed by the user), and if so, retrieves its associated HTML element and stores it in a variable called previousElement.

The method then checks the status of currentNode. If it is not a target, start, or object node, and there is a previously switched node, it switches the status and weight of the previously switched node back to its original status and weight. It also resets the previously switched node and previously pressed node status and weight to null and the weight of the current node to 0. It then sets the status and class name of currentNode to the pressed node status.

If currentNode is a target, start, or object node, and its status is not the same as the pressed node status, and the algorithm has not yet been run, it switches the status of the previously switched node to the pressed node status and sets its class name to the pressed node status.

If currentNode is a target, start, or object node, and its status is the same as the pressed node status, it sets the previously switched node to currentNode and sets the class name and status of currentNode to the previously pressed node status.

Overall, this method enables the user to interactively change the status and weight of nodes on the board by clicking on them, and it provides the necessary logic to ensure that the state of the board is consistent and valid.
Here's a line-by-line explanation of the code:


Board.prototype.changeSpecialNode = function(currentNode) {
This function is defined as a method of the Board class prototype. It takes a single argument, which is a reference to a Node object.


let element = document.getElementById(currentNode.id), previousElement;
This line declares two variables using destructuring syntax. The element variable is assigned a reference to the HTML element with the same id attribute as the Node object. The previousElement variable is declared but not yet assigned a value.


if (this.previouslySwitchedNode) previousElement = document.getElementById(this.previouslySwitchedNode.id);
This line checks if the previouslySwitchedNode property of the Board object is truthy. If it is, it assigns the previousElement variable a reference to the HTML element corresponding to the Node object that was previously switched (i.e., the previouslySwitchedNode property of the Board object).



if (currentNode.status !== "target" && currentNode.status !== "start" && currentNode.status !== "object") {
This line checks if the status property of the currentNode object is not equal to "target", "start", or "object". If it is not, this block of code is executed:


if (this.previouslySwitchedNode) {
  this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
  previousElement.className = this.previouslySwitchedNodeWeight === 15 ?
    "unvisited weight" : this.previouslyPressedNodeStatus;
  this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15 ?
    15 : 0;
  this.previouslySwitchedNode = null;
  this.previouslySwitchedNodeWeight = currentNode.weight;

  this.previouslyPressedNodeStatus = currentNode.status;
  element.className = this.pressedNodeStatus;
  currentNode.status = this.pressedNodeStatus;

  currentNode.weight = 0;
}
This block of code checks if the previouslySwitchedNode property of the Board object is truthy. If it is, it reverts the status and weight of the previously switched Node object to their previous values. It also nullifies the previouslySwitchedNode property of the Board object and sets the previouslySwitchedNodeWeight property to the weight of the currentNode object. It then sets the status and weight of the currentNode object to the values of the previouslyPressedNodeStatus property and 0, respectively.


} else if (currentNode.status !== this.pressedNodeStatus && !this.algoDone) {
If the currentNode object's status is not equal to the value of the pressedNodeStatus property of the Board object, and the algoDone property of the Board object is falsy, this block of code is executed:

this.previouslySwitchedNode.status = this.pressedNodeStatus;
previousElement.className = this.pressedNodeStatus;
This block of code sets the status of the previouslySwitchedNode object to the value of the pressedNodeStatus property of the Board object. It also sets the className property of the previousElement object to the value of the pressedNodeStatus property of the Board object.

} else if (currentNode.status === this.pressed 
  
  The function changeSpecialNode is used to change the status of a given node on the board based on user input. It takes in a single parameter currentNode, which is an object representing a node on the board.

let element = document.getElementById(currentNode.id), previousElement;: Declares the element variable, which will hold the HTML element corresponding to currentNode. Declares previousElement without initializing it.

if (this.previouslySwitchedNode) previousElement = document.getElementById(this.previouslySwitchedNode.id);: Checks if there is a previously switched node and if so, initializes previousElement to the corresponding HTML element.

if (currentNode.status !== "target" && currentNode.status !== "start" && currentNode.status !== "object") {: Checks if currentNode is a normal node, i.e., not a target, start, or object node.

if (this.previouslySwitchedNode) {: Checks if there is a previously switched node.

this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;: Changes the status of the previously switched node to its previously pressed status.

previousElement.className = this.previouslySwitchedNodeWeight === 15 ? "unvisited weight" : this.previouslyPressedNodeStatus;: Changes the class name of previousElement based on the weight of the previously switched node.

this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15 ? 15 : 0;: Changes the weight of the previously switched node based on its previous weight.

this.previouslySwitchedNode = null;: Sets this.previouslySwitchedNode to null.

this.previouslySwitchedNodeWeight = currentNode.weight;: Sets the weight of the previously switched node to the weight of currentNode.

this.previouslyPressedNodeStatus = currentNode.status;: Sets the previously pressed node status to the status of currentNode.

element.className = this.pressedNodeStatus;: Changes the class name of element to the pressed node status.

currentNode.status = this.pressedNodeStatus;: Sets the status of currentNode to the pressed node status.

currentNode.weight = 0;: Sets the weight of currentNode to 0.

} else if (currentNode.status !== this.pressedNodeStatus && !this.algoDone) {: Checks if currentNode is not the same as the pressed node status and that the algorithm is not done.

this.previouslySwitchedNode.status = this.pressedNodeStatus;: Changes the status of the previously switched node to the pressed node status.

previousElement.className = this.pressedNodeStatus;: Changes the class name of previousElement to the pressed node status.

} else if (currentNode.status === this.pressedNodeStatus) {: Checks if currentNode has the same status as the pressed node status.

this.previouslySwitchedNode = currentNode;: Sets this.previouslySwitchedNode to currentNode.

element.className = this.previouslyPressedNodeStatus;: Changes the class name of element to the previously pressed node status.

currentNode.status = this.previouslyPressedNodeStatus;: Sets the status of currentNode to the previously pressed node status.



*/
Board.prototype.changeNormalNode = function(currentNode) {
  let element = document.getElementById(currentNode.id);
  let relevantStatuses = ["start", "target", "object"];
  let unweightedAlgorithms = ["dfs", "bfs"]
  if (!this.keyDown) {
    if (!relevantStatuses.includes(currentNode.status)) {
      element.className = currentNode.status !== "wall" ?
        "wall" : "unvisited";
      currentNode.status = element.className !== "wall" ?
        "unvisited" : "wall";
      currentNode.weight = 0;
    }
  } else if (this.keyDown === 87 && !unweightedAlgorithms.includes(this.currentAlgorithm)) {
    if (!relevantStatuses.includes(currentNode.status)) {
      element.className = currentNode.weight !== 15 ?
        "unvisited weight" : "unvisited";
      currentNode.weight = element.className !== "unvisited weight" ?
        0 : 15;
      currentNode.status = "unvisited";
    }
  }
};
/*
This is a method on the Board prototype in a web application that handles changing the status of a normal node (i.e., a node that is not the start, target, or object nodes) based on user input. Here's a line-by-line explanation of the code:


Board.prototype.changeNormalNode = function(currentNode) {
This line defines the changeNormalNode method on the Board prototype, which takes in a currentNode parameter representing the node that the user interacted with.

let element = document.getElementById(currentNode.id);
This line retrieves the HTML element associated with the currentNode by its id property and assigns it to the element variable.


let relevantStatuses = ["start", "target", "object"];
let unweightedAlgorithms = ["dfs", "bfs"]
These lines define two arrays: relevantStatuses includes the statuses that are considered "relevant" to the user's interactions, which are the start, target, and object statuses; unweightedAlgorithms includes the names of the unweighted pathfinding algorithms that do not consider node weights.


if (!this.keyDown) {
This line checks if the keyDown property on the Board object is falsy, which means that no modifier key is being pressed by the user (e.g., the shift key).


if (!relevantStatuses.includes(currentNode.status)) {
This line checks if the status property of the currentNode is not included in the relevantStatuses array, which means that the user is not interacting with the start, target, or object node.


element.className = currentNode.status !== "wall" ?
  "wall" : "unvisited";
This line sets the className property of the element to "wall" if the status of the currentNode is not "wall", or "unvisited" otherwise. This changes the appearance of the node on the UI.


currentNode.status = element.className !== "wall" ?
  "unvisited" : "wall";
This line sets the status property of the currentNode to "unvisited" if the className of the element is not "wall", or "wall" otherwise. This updates the status property of the node to reflect its new appearance on the UI.


currentNode.weight = 0;
This line sets the weight property of the currentNode to 0, which means that the node is not weighted.


} else if (this.keyDown === 87 && !unweightedAlgorithms.includes(this.currentAlgorithm)) {
This line checks if the keyDown property on the Board object is 87, which corresponds to the "w" key (this is a hard-coded value for the web application). It also checks if the currentAlgorithm property is not included in the unweightedAlgorithms array, which means that the algorithm being used considers node weights.


if (!relevantStatuses.includes(currentNode.status)) {
This line checks if the status property of the currentNode is not included in the relevantStatuses array, which means that the user is not interacting with the start, target, or object node.


element.className = currentNode.weight !== 15 ?
  "unvisited weight" : "unvisited";
This line sets the className property of the element to "unvisited weight" if the weight of the currentNode is not 15, or 

The relevantStatuses array contains the node statuses that are considered relevant for this function. These statuses are "start", "target", and "object".
The unweightedAlgorithms array contains the names of the algorithms that don't take node weights into account, and therefore cannot use weighted nodes. These algorithms are "dfs" (depth-first search) and "bfs" (breadth-first search).
The code then checks if this.keyDown is falsy. If it is, the function continues to execute. If it's truthy, the code checks if it's equal to 87, which is the keyCode for the "W" key. If both conditions are met, the function checks if the current algorithm is in the unweightedAlgorithms array. If it is not, the function continues to execute.
If the current node's status is not in the relevantStatuses array, the code checks if the current node's status is not "wall". If it's not "wall", it changes the class of the element to "wall" and sets the current node's status to "unvisited". If the current node's status is "wall", it changes the class of the element to "unvisited" and sets the current node's status to "wall". The current node's weight is also set to 0 in both cases.
If the this.keyDown is equal to 87 and the current algorithm is not in the unweightedAlgorithms array, the function checks if the current node's status is not in the relevantStatuses array. If it's not, the code checks if the current node's weight is not 15. If it's not 15, the class of the element is changed to "unvisited weight" and the current node's weight is set to 15. If the current node's weight is 15, the class of the element is changed to "unvisited" and the current node's weight is set to 0. Finally, the current node's status is set to "unvisited".
In summary, this function handles changes to normal nodes (i.e. nodes that are not the start node, the target node, or object nodes). If the "W" key is pressed and the current algorithm can handle weighted nodes, the function allows the user to add or remove weight from normal nodes. Otherwise, the function allows the user to toggle normal nodes between "wall" and "unvisited" status.*/
Board.prototype.drawShortestPath = function(targetNodeId, startNodeId, object) {
  let currentNode;
  if (this.currentAlgorithm !== "bidirectional") {
    currentNode = this.nodes[this.nodes[targetNodeId].previousNode];
    if (object) {
      while (currentNode.id !== startNodeId) {
        this.objectShortestPathNodesToAnimate.unshift(currentNode);
        currentNode = this.nodes[currentNode.previousNode];
      }
    } else {
      while (currentNode.id !== startNodeId) {
        this.shortestPathNodesToAnimate.unshift(currentNode);
        document.getElementById(currentNode.id).className = `shortest-path`;
        currentNode = this.nodes[currentNode.previousNode];
      }
    }
  } else {
    if (this.middleNode !== this.target && this.middleNode !== this.start) {
      currentNode = this.nodes[this.nodes[this.middleNode].previousNode];
      secondCurrentNode = this.nodes[this.nodes[this.middleNode].otherpreviousNode];
      if (secondCurrentNode.id === this.target) {
        this.nodes[this.target].direction = getDistance(this.nodes[this.middleNode], this.nodes[this.target])[2];
      }
      if (this.nodes[this.middleNode].weight === 0) {
        document.getElementById(this.middleNode).className = `shortest-path`;
      } else {
        document.getElementById(this.middleNode).className = `shortest-path weight`;
      }
      while (currentNode.id !== startNodeId) {
        this.shortestPathNodesToAnimate.unshift(currentNode);
        document.getElementById(currentNode.id).className = `shortest-path`;
        currentNode = this.nodes[currentNode.previousNode];
      }
      while (secondCurrentNode.id !== targetNodeId) {
        this.shortestPathNodesToAnimate.unshift(secondCurrentNode);
        document.getElementById(secondCurrentNode.id).className = `shortest-path`;
        if (secondCurrentNode.otherpreviousNode === targetNodeId) {
          if (secondCurrentNode.otherdirection === "left") {
            secondCurrentNode.direction = "right";
          } else if (secondCurrentNode.otherdirection === "right") {
            secondCurrentNode.direction = "left";
          } else if (secondCurrentNode.otherdirection === "up") {
            secondCurrentNode.direction = "down";
          } else if (secondCurrentNode.otherdirection === "down") {
            secondCurrentNode.direction = "up";
          }
          this.nodes[this.target].direction = getDistance(secondCurrentNode, this.nodes[this.target])[2];
        }
        secondCurrentNode = this.nodes[secondCurrentNode.otherpreviousNode]
      }
    } else {
      document.getElementById(this.nodes[this.target].previousNode).className = `shortest-path`;
    }
  }
};
/**
 This is a method in the Board class that is responsible for drawing the shortest path on the grid. Here is a line-by-line explanation:

The method takes in three arguments, targetNodeId (the ID of the target node), startNodeId (the ID of the start node), and object (a boolean indicating whether an object is present in the grid).

A variable called currentNode is initialized.

An if statement checks if the current algorithm being used is not bidirectional. If it is not bidirectional, then the shortest path is calculated and stored in currentNode.

Another if statement checks if an object is present in the grid. If it is, then the shortest path for the object is calculated and stored in this.objectShortestPathNodesToAnimate array.

If an object is not present, then a while loop is used to iterate through the currentNode's previous nodes until it reaches the start node. At each iteration, the current node is added to the this.shortestPathNodesToAnimate array and its class is set to "shortest-path".

If the current algorithm is bidirectional, then the else statement is executed.

An if statement checks if the middle node is not equal to the target or start node.

If the above condition is true, then the currentNode is initialized with the previous node of the middle node, and the secondCurrentNode is initialized with the other previous node of the middle node. The direction from the second current node to the target node is set based on the distance between the nodes.

If the weight of the middle node is 0, then its class is set to "shortest-path". Otherwise, its class is set to "shortest-path weight".

Two while loops are used to iterate through the previous nodes of the currentNode and secondCurrentNode until they reach the start node and target node, respectively. At each iteration, the current node is added to the this.shortestPathNodesToAnimate array, and its class is set to "shortest-path". If the secondCurrentNode's other previous node is the target node, then the direction from the secondCurrentNode to the target node is set based on the direction of the other previous node.

Finally, the secondCurrentNode is set to the other previous node of itself, and the process continues until the target node is reached.

If the middle node is equal to the target or start node, then the class of the previous node of the target node is set to "shortest-path".

In summary, this method is responsible for calculating and drawing the shortest path on the grid, taking into account whether the algorithm is bidirectional and whether an object is present in the grid. It iterates through the previous nodes of the current node until it reaches the start node, and its class is set to "shortest-path". If the algorithm is bidirectional, then two while loops are used to iterate through the previous nodes of currentNode and secondCurrentNode, respectively, until they reach the start and target nodes, and their classes are set to "shortest-path".




 */
Board.prototype.addShortestPath = function(targetNodeId, startNodeId, object) {
  let currentNode = this.nodes[this.nodes[targetNodeId].previousNode];
  if (object) {
    while (currentNode.id !== startNodeId) {
      this.objectShortestPathNodesToAnimate.unshift(currentNode);
      currentNode.relatesToObject = true;
      currentNode = this.nodes[currentNode.previousNode];
    }
  } else {
    while (currentNode.id !== startNodeId) {
      this.shortestPathNodesToAnimate.unshift(currentNode);
      currentNode = this.nodes[currentNode.previousNode];
    }
  }
};
/*
The addShortestPath method is a function of the Board class, which is responsible for adding the shortest path between the start and target nodes to the animation queue. The function takes three arguments: targetNodeId, startNodeId, and object.

The first line of the function initializes a variable currentNode to be the previous node of the target node, which is the last node in the shortest path from the start to the target node.

The if statement checks if the object argument is true. If it is true, then the function enters a while loop that continues until the currentNode is equal to the start node. Inside the loop, it pushes the currentNode to the objectShortestPathNodesToAnimate array, which is later used to animate the shortest path to the object. It also sets the relatesToObject property of the currentNode to true, indicating that it is part of the shortest path to the object. Finally, it sets currentNode to be the previous node of the current node.

If the object argument is false, then the else block is executed. It enters a while loop that continues until the currentNode is equal to the start node. Inside the loop, it pushes the currentNode to the shortestPathNodesToAnimate array, which is later used to animate the shortest path from the start to the target node. Finally, it sets currentNode to be the previous node of the current node.

In summary, the addShortestPath method of the Board class is responsible for adding the nodes in the shortest path from the start to the target node (or from the start to the object node) to the animation queue, which is later used to animate the path on the grid.
Sure, here's a line-by-line explanation of Board.prototype.addShortestPath:

javascript
Copy code
Board.prototype.addShortestPath = function(targetNodeId, startNodeId, object) {
This line defines a method called addShortestPath on the Board prototype. It takes in three parameters: the targetNodeId, startNodeId, and a boolean object.


  let currentNode = this.nodes[this.nodes[targetNodeId].previousNode];
This line retrieves the current node by accessing the previousNode property of the node with targetNodeId. This node is the one before the target node on the shortest path.


  if (object) {
If the object parameter is true (i.e. an object is being moved), the following block of code is executed.


    while (currentNode.id !== startNodeId) {
      this.objectShortestPathNodesToAnimate.unshift(currentNode);
      currentNode.relatesToObject = true;
      currentNode = this.nodes[currentNode.previousNode];
    }
This block of code iterates through the nodes on the shortest path from the target node to the start node (i.e. in reverse order), and adds each node to the objectShortestPathNodesToAnimate array. It also sets the relatesToObject property of each node to true, indicating that it is part of the path of the moved object.


  } else {
If the object parameter is false (i.e. no object is being moved), the following block of code is executed.


    while (currentNode.id !== startNodeId) {
      this.shortestPathNodesToAnimate.unshift(currentNode);
      currentNode = this.nodes[currentNode.previousNode];
    }
  }
This block of code iterates through the nodes on the shortest path from the target node to the start node (i.e. in reverse order), and adds each node to the shortestPathNodesToAnimate array.

In summary, this method adds the nodes on the shortest path from the target node to the start node to either the shortestPathNodesToAnimate or objectShortestPathNodesToAnimate array, depending on the value of the object parameter. It also sets the relatesToObject property of each node to true if an object is being moved. */

Board.prototype.drawShortestPathTimeout = function(targetNodeId, startNodeId, type, object) {
  let board = this;
  let currentNode;
  let secondCurrentNode;
  let currentNodesToAnimate;

  if (board.currentAlgorithm !== "bidirectional") {
    currentNode = board.nodes[board.nodes[targetNodeId].previousNode];
    if (object) {
      board.objectShortestPathNodesToAnimate.push("object");
      currentNodesToAnimate = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
    } else {
      currentNodesToAnimate = [];
      while (currentNode.id !== startNodeId) {
        currentNodesToAnimate.unshift(currentNode);
        currentNode = board.nodes[currentNode.previousNode];
      }
    }
  } else {
    if (board.middleNode !== board.target && board.middleNode !== board.start) {
      currentNode = board.nodes[board.nodes[board.middleNode].previousNode];
      secondCurrentNode = board.nodes[board.nodes[board.middleNode].otherpreviousNode];
      if (secondCurrentNode.id === board.target) {
        board.nodes[board.target].direction = getDistance(board.nodes[board.middleNode], board.nodes[board.target])[2];
      }
      if (object) {

      } else {
        currentNodesToAnimate = [];
        board.nodes[board.middleNode].direction = getDistance(currentNode, board.nodes[board.middleNode])[2];
        while (currentNode.id !== startNodeId) {
          currentNodesToAnimate.unshift(currentNode);
          currentNode = board.nodes[currentNode.previousNode];
        }
        currentNodesToAnimate.push(board.nodes[board.middleNode]);
        while (secondCurrentNode.id !== targetNodeId) {
          if (secondCurrentNode.otherdirection === "left") {
            secondCurrentNode.direction = "right";
          } else if (secondCurrentNode.otherdirection === "right") {
            secondCurrentNode.direction = "left";
          } else if (secondCurrentNode.otherdirection === "up") {
            secondCurrentNode.direction = "down";
          } else if (secondCurrentNode.otherdirection === "down") {
            secondCurrentNode.direction = "up";
          }
          currentNodesToAnimate.push(secondCurrentNode);
          if (secondCurrentNode.otherpreviousNode === targetNodeId) {
            board.nodes[board.target].direction = getDistance(secondCurrentNode, board.nodes[board.target])[2];
          }
          secondCurrentNode = board.nodes[secondCurrentNode.otherpreviousNode]
        }
    }
  } else {
    currentNodesToAnimate = [];
    let target = board.nodes[board.target];
    currentNodesToAnimate.push(board.nodes[target.previousNode], target);
  }

}


  timeout(0);

  function timeout(index) {
    if (!currentNodesToAnimate.length) currentNodesToAnimate.push(board.nodes[board.start]);
    setTimeout(function () {
      if (index === 0) {
        shortestPathChange(currentNodesToAnimate[index]);
      } else if (index < currentNodesToAnimate.length) {
        shortestPathChange(currentNodesToAnimate[index], currentNodesToAnimate[index - 1]);
      } else if (index === currentNodesToAnimate.length) {
        shortestPathChange(board.nodes[board.target], currentNodesToAnimate[index - 1], "isActualTarget");
      }
      if (index > currentNodesToAnimate.length) {
        board.toggleButtons();
        return;
      }
      timeout(index + 1);
    }, 40)
  }


  function shortestPathChange(currentNode, previousNode, isActualTarget) {
    if (currentNode === "object") {
      let element = document.getElementById(board.object);
      element.className = "objectTransparent";
    } else if (currentNode.id !== board.start) {
      if (currentNode.id !== board.target || currentNode.id === board.target && isActualTarget) {
        let currentHTMLNode = document.getElementById(currentNode.id);
        if (type === "unweighted") {
          currentHTMLNode.className = "shortest-path-unweighted";
        } else {
          let direction;
          if (currentNode.relatesToObject && !currentNode.overwriteObjectRelation && currentNode.id !== board.target) {
            direction = "storedDirection";
            currentNode.overwriteObjectRelation = true;
          } else {
            direction = "direction";
          }
          if (currentNode[direction] === "up") {
            currentHTMLNode.className = "shortest-path-up";
          } else if (currentNode[direction] === "down") {
            currentHTMLNode.className = "shortest-path-down";
          } else if (currentNode[direction] === "right") {
            currentHTMLNode.className = "shortest-path-right";
          } else if (currentNode[direction] === "left") {
            currentHTMLNode.className = "shortest-path-left";
          } else {
            currentHTMLNode.className = "shortest-path";
          }
        }
      }
    }
    if (previousNode) {
      if (previousNode !== "object" && previousNode.id !== board.target && previousNode.id !== board.start) {
        let previousHTMLNode = document.getElementById(previousNode.id);
        previousHTMLNode.className = previousNode.weight === 15 ? "shortest-path weight" : "shortest-path";
      }
    } else {
      let element = document.getElementById(board.start);
      element.className = "startTransparent";
    }
  }





};
/*
This code defines a method called drawShortestPathTimeout on the Board prototype. This method is responsible for drawing the shortest path between two nodes on the board.

The method takes four parameters: targetNodeId, startNodeId, type, and object. targetNodeId and startNodeId are the IDs of the nodes between which the shortest path is to be drawn. type specifies whether the graph is weighted or unweighted. object is a boolean value that indicates whether an object is present on the board.

The method starts by initializing some local variables - board, currentNode, secondCurrentNode, and currentNodesToAnimate. board refers to the current instance of the Board class. currentNode and secondCurrentNode are used to keep track of the nodes being animated during the shortest path animation. currentNodesToAnimate is an array that stores the nodes that need to be animated during the shortest path animation.

The method then checks whether the current algorithm is bidirectional or not. If it is not, then it sets currentNode to the node that is the previous node of the target node. If an object is present on the board, the method pushes "object" into the board.objectShortestPathNodesToAnimate array and concatenates it with the board.shortestPathNodesToAnimate array to get the currentNodesToAnimate array. If an object is not present on the board, the method initializes currentNodesToAnimate as an empty array and uses a while loop to iterate through the previous nodes of currentNode until it reaches the start node. It then unshifts each of these nodes into currentNodesToAnimate to get the shortest path.

If the current algorithm is bidirectional, the method checks whether the middle node is not the same as the target node and the start node. If it is not, then it sets currentNode to the node that is the previous node of the middle node and sets secondCurrentNode to the other previous node of the middle node. It then checks whether secondCurrentNode is the same as the target node. If it is, it sets the direction property of the target node to the third element of the result of the getDistance function, which returns the direction of the shortest path between two nodes. If an object is present on the board, the method does nothing. If an object is not present on the board, it initializes currentNodesToAnimate as an empty array, sets the direction property of the middle node to the third element of the result of the getDistance function between currentNode and the middle node, and uses a while loop to iterate through the previous nodes of currentNode until it reaches the start node. It then unshifts each of these nodes into currentNodesToAnimate. The method then pushes the middle node into currentNodesToAnimate and uses another while loop to iterate through the other previous nodes of secondCurrentNode until it reaches the target node. During each iteration, the method sets the direction property of the current node to the opposite direction of its otherdirection property (i.e., "right" becomes "left", "up" becomes "down", etc.), pushes the current node into currentNodesToAnimate, and sets the direction property of the target node to the third element of the result of the getDistance function between the current node and the target node if the otherpreviousNode property of the current node is the same as the target node. Once all the nodes have been added to `currentNodes 
Next, we have a nested timeout function. This function is called with an initial index of 0 and will recursively call itself with an incremented index until index is greater than currentNodesToAnimate.length. Inside the timeout function, we first check if currentNodesToAnimate is empty. If it is empty, we add the start node to currentNodesToAnimate. We then use setTimeout to delay the execution of the shortestPathChange function for 40 milliseconds.

Inside the shortestPathChange function, we check if the current node is the string "object". If it is, we change the class name of the HTML element with the ID of board.object to "objectTransparent". If the current node is not the start node, we check if it is the target node and whether isActualTarget is truthy. If it is not the target node or if isActualTarget is truthy, we change the class name of the HTML element corresponding to the current node based on the value of the type parameter passed to the drawShortestPathTimeout function.

If a previousNode is provided, we change the class name of the corresponding HTML element to "shortest-path" or "shortest-path weight" if the node has a weight of 15. If previousNode is not provided, we change the class name of the HTML element corresponding to the start node to "startTransparent".

Overall, the drawShortestPathTimeout function is used to animate the shortest path on the board from the target node to the start node, or vice versa if the current algorithm is "bidirectional". The function takes in a target node ID, start node ID, type, and object as parameters. It first initializes some variables depending on the current algorithm being used. It then calls the timeout function, which recursively calls the shortestPathChange function to animate the shortest path on the board.



*/
Board.prototype.createMazeOne = function(type) {
  Object.keys(this.nodes).forEach(node => {
    let random = Math.random();
    let currentHTMLNode = document.getElementById(node);
    let relevantClassNames = ["start", "target", "object"]
    let randomTwo = type === "wall" ? 0.25 : 0.35;
    if (random < randomTwo && !relevantClassNames.includes(currentHTMLNode.className)) {
      if (type === "wall") {
        currentHTMLNode.className = "wall";
        this.nodes[node].status = "wall";
        this.nodes[node].weight = 0;
      } else if (type === "weight") {
        currentHTMLNode.className = "unvisited weight";
        this.nodes[node].status = "unvisited";
        this.nodes[node].weight = 15;
      }
    }
  });
};
/*
This code is a method createMazeOne belonging to a Board prototype in JavaScript. The purpose of this method is to randomly add walls or weights to the nodes of a grid represented by HTML elements.

Here's a step-by-step explanation of the code:

Object.keys(this.nodes).forEach(node => {: This line uses the Object.keys() method to get an array of keys for the nodes property of the Board object. The forEach() method is then used to loop through each key.

let random = Math.random();: This line generates a random number between 0 and 1 using the Math.random() method and assigns it to a variable random.

let currentHTMLNode = document.getElementById(node);: This line uses the getElementById() method to get the HTML element with the id that matches the current node key and assigns it to a variable currentHTMLNode.

let relevantClassNames = ["start", "target", "object"]: This line creates an array of class names that should not be overwritten by a wall or weight.

let randomTwo = type === "wall" ? 0.25 : 0.35;: This line sets the probability of a node being turned into a wall or weight based on the type parameter passed to the method. If type is "wall", then the probability is 0.25. If type is "weight", then the probability is 0.35.

if (random < randomTwo && !relevantClassNames.includes(currentHTMLNode.className)) {: This line checks if the random number generated in step 2 is less than the probability calculated in step 5 and if the class name of the current HTML element is not included in the relevantClassNames array.

if (type === "wall") {: This line checks if the type parameter passed to the method is "wall".

currentHTMLNode.className = "wall";: This line sets the class name of the current HTML element to "wall".

this.nodes[node].status = "wall";: This line sets the status property of the node key in the nodes property of the Board object to "wall".

this.nodes[node].weight = 0;: This line sets the weight property of the node key in the nodes property of the Board object to 0.

} else if (type === "weight") {: This line checks if the type parameter passed to the method is "weight".

currentHTMLNode.className = "unvisited weight";: This line sets the class name of the current HTML element to "unvisited weight".

this.nodes[node].status = "unvisited";: This line sets the status property of the node key in the nodes property of the Board object to "unvisited".

this.nodes[node].weight = 15;: This line sets the weight property of the node key in the nodes property of the Board object to 15.

In summary, this method randomly sets the class and properties of nodes on a grid represented by HTML elements. If the type parameter is "wall", then nodes have a 25% chance of being turned into a wall, while if the type parameter is "weight", nodes have a 35% chance of being turned into a weight. Nodes with class names of `" */

Board.prototype.clearPath = function(clickedButton) {
  if (clickedButton) {
    let start = this.nodes[this.start];
    let target = this.nodes[this.target];
    let object = this.numberOfObjects ? this.nodes[this.object] : null;
    start.status = "start";
    document.getElementById(start.id).className = "start";
    target.status = "target";
    document.getElementById(target.id).className = "target";
    if (object) {
      object.status = "object";
      document.getElementById(object.id).className = "object";
    }
  }

  document.getElementById("startButtonStart").onclick = () => {
    if (!this.currentAlgorithm) {
      document.getElementById("startButtonStart").innerHTML = '<button class="btn btn-default navbar-btn" type="button">Pick an Algorithm!</button>'
    } else {
      this.clearPath("clickedButton");
      this.toggleButtons();
      let weightedAlgorithms = ["dijkstra", "CLA", "greedy"];
      let unweightedAlgorithms = ["dfs", "bfs"];
      let success;
      if (this.currentAlgorithm === "bidirectional") {
        if (!this.numberOfObjects) {
          success = bidirectional(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
        }
        this.algoDone = true;
      } else if (this.currentAlgorithm === "astar") {
        if (!this.numberOfObjects) {
          success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
          success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted", "object", this.currentAlgorithm, this.currentHeuristic);
        }
        this.algoDone = true;
      } else if (weightedAlgorithms.includes(this.currentAlgorithm)) {
        if (!this.numberOfObjects) {
          success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
          success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted", "object", this.currentAlgorithm, this.currentHeuristic);
        }
        this.algoDone = true;
      } else if (unweightedAlgorithms.includes(this.currentAlgorithm)) {
        if (!this.numberOfObjects) {
          success = unweightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm);
          launchAnimations(this, success, "unweighted");
        } else {
          this.isObject = true;
          success = unweightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm);
          launchAnimations(this, success, "unweighted", "object", this.currentAlgorithm);
        }
        this.algoDone = true;
      }
    }
  }

  this.algoDone = false;
  Object.keys(this.nodes).forEach(id => {
    let currentNode = this.nodes[id];
    currentNode.previousNode = null;
    currentNode.distance = Infinity;
    currentNode.totalDistance = Infinity;
    currentNode.heuristicDistance = null;
    currentNode.direction = null;
    currentNode.storedDirection = null;
    currentNode.relatesToObject = false;
    currentNode.overwriteObjectRelation = false;
    currentNode.otherpreviousNode = null;
    currentNode.otherdistance = Infinity;
    currentNode.otherdirection = null;
    let currentHTMLNode = document.getElementById(id);
    let relevantStatuses = ["wall", "start", "target", "object"];
    if ((!relevantStatuses.includes(currentNode.status) || currentHTMLNode.className === "visitedobject") && currentNode.weight !== 15) {
      currentNode.status = "unvisited";
      currentHTMLNode.className = "unvisited";
    } else if (currentNode.weight === 15) {
      currentNode.status = "unvisited";
      currentHTMLNode.className = "unvisited weight";
    }
  });
};
/*
This code is part of the Board object in a pathfinding algorithm visualization tool. Specifically, this method is used to clear the board of any paths that have been previously drawn.

The first conditional statement checks if the clickedButton parameter is truthy. If so, it resets the start, target, and object nodes to their original status (i.e. "start", "target", and "object") and updates their class names in the HTML document accordingly.

The next section of code is executed when the "start" button is clicked. It first checks if an algorithm has been selected by the user. If not, it sets the button text to prompt the user to select an algorithm. If an algorithm has been selected, it calls the clearPath method with the "clickedButton" parameter set to true, resets various properties of each node in the nodes object, and then proceeds to execute the selected algorithm.

The nodes object contains all of the nodes on the board, each identified by a unique id. For each node in the nodes object, this code resets various properties to their default values, including previousNode, distance, totalDistance, heuristicDistance, direction, storedDirection, relatesToObject, overwriteObjectRelation, otherpreviousNode, otherdistance, and otherdirection. The node's status and class name in the HTML document are also updated based on the node's weight and status.

Overall, this method is responsible for clearing any previously drawn paths and resetting the board to its default state so that a new algorithm can be executed.

here is a detailed explanation of each line of the Board.prototype.clearPath method:


Board.prototype.clearPath = function(clickedButton) {
This line defines the clearPath method on the Board prototype object. It takes in one parameter, clickedButton, which is an optional boolean value that indicates whether the clear path button was clicked.

  if (clickedButton) {
    let start = this.nodes[this.start];
    let target = this.nodes[this.target];
    let object = this.numberOfObjects ? this.nodes[this.object] : null;
If the clickedButton parameter is truthy (i.e. it exists and is not false, 0, '', null, undefined, or NaN), this code block will be executed. This block initializes variables start, target, and object, which represent the starting node, target node, and object node (if it exists), respectively.

    start.status = "start";
    document.getElementById(start.id).className = "start";
    target.status = "target";
    document.getElementById(target.id).className = "target";
    if (object) {
      object.status = "object";
      document.getElementById(object.id).className = "object";
    }
  }
This block sets the status and class name of the starting and target nodes back to their initial values, which are "start" and "target", respectively. If an object node exists, its status and class name are also set back to their initial values, which are "object".

  document.getElementById("startButtonStart").onclick = () => {
    if (!this.currentAlgorithm) {
      document.getElementById("startButtonStart").innerHTML = '<button class="btn btn-default navbar-btn" type="button">Pick an Algorithm!</button>'
    } else {
      this.clearPath("clickedButton");
      this.toggleButtons();
      let weightedAlgorithms = ["dijkstra", "CLA", "greedy"];
      let unweightedAlgorithms = ["dfs", "bfs"];
      let success;
      if (this.currentAlgorithm === "bidirectional") {
        if (!this.numberOfObjects) {
          success = bidirectional(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
        }
        this.algoDone = true;
      } else if (this.currentAlgorithm === "astar") {
        if (!this.numberOfObjects) {
          success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
          success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted", "object", this.currentAlgorithm, this.currentHeuristic);
        }
        this.algoDone = true;
      } else if (weightedAlgorithms.includes(this.currentAlgorithm)) {
        if (!this.numberOfObjects) {
          success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
          launchAnimations(this, success, "weighted");
        } else {
          this.isObject = true;
          success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.current



*/

Board.prototype.clearWalls = function() {
  this.clearPath("clickedButton");
  Object.keys(this.nodes).forEach(id => {
    let currentNode = this.nodes[id];
    let currentHTMLNode = document.getElementById(id);
    if (currentNode.status === "wall" || currentNode.weight === 15) {
      currentNode.status = "unvisited";
      currentNode.weight = 0;
      currentHTMLNode.className = "unvisited";
    }
  });
}
/*
This code is a method called clearWalls for the Board object prototype. It is responsible for clearing all the walls and weights that have been added to the board.

Here's an explanation of each line:

Board.prototype.clearWalls = function() {: This creates a new function called clearWalls on the Board prototype.

this.clearPath("clickedButton");: This clears the path on the board by calling the clearPath method of the Board object, passing in "clickedButton" as the argument.

Object.keys(this.nodes).forEach(id => {: This loops through all the keys in the this.nodes object and performs a function on each key-value pair.

let currentNode = this.nodes[id];: This sets a variable currentNode to the value of the current key in the loop.

let currentHTMLNode = document.getElementById(id);: This sets a variable currentHTMLNode to the HTML element with the current key as its ID.

if (currentNode.status === "wall" || currentNode.weight === 15) {: This checks if the current node's status is "wall" or its weight is 15.

currentNode.status = "unvisited";: If the current node is a wall, this sets its status to "unvisited".

currentNode.weight = 0;: If the current node has a weight of 15, this sets its weight to 0.

currentHTMLNode.className = "unvisited";: This sets the class of the current HTML node to "unvisited", which removes any styling associated with being a wall or weight.

Overall, this function clears all the walls and weights on the board and resets the corresponding node statuses and weights to their default values.

Sure, here's an explanation of each line of code:


Board.prototype.clearWalls = function() {
This creates a new function called clearWalls and adds it to the Board prototype.



  this.clearPath("clickedButton");
This calls the clearPath function of the current board object with the argument "clickedButton". This clears any paths that may be on the board, such as the shortest path between the start and target nodes.


  Object.keys(this.nodes).forEach(id => {
This loops through each key in the nodes object of the current board object.


    let currentNode = this.nodes[id];
    let currentHTMLNode = document.getElementById(id);
This sets the currentNode variable to the node object associated with the current id, and the currentHTMLNode variable to the HTML element associated with the same id.


    if (currentNode.status === "wall" || currentNode.weight === 15) {
This checks if the current node is a wall or has a weight of 15. A weight of 15 is used to represent a heavy weight that is slower to traverse than a regular weight (represented by values 1-14).


      currentNode.status = "unvisited";
      currentNode.weight = 0;
      currentHTMLNode.className = "unvisited";
This sets the status of the current node to "unvisited", sets its weight to 0 (i.e., it is no longer a weight or a wall), and updates the class of the corresponding HTML element to "unvisited". This effectively clears any walls or weights from the current node.

  });
}
This ends the loop through all nodes, and thus the clearWalls function.


*/
Board.prototype.clearWeights = function() {
  Object.keys(this.nodes).forEach(id => {
    let currentNode = this.nodes[id];
    let currentHTMLNode = document.getElementById(id);
    if (currentNode.weight === 15) {
      currentNode.status = "unvisited";
      currentNode.weight = 0;
      currentHTMLNode.className = "unvisited";
    }
  });
}
/*
This code defines a method called clearWeights on the Board prototype, which clears all weights (excluding walls) from the board.

Here's a line-by-line explanation:


Board.prototype.clearWeights = function() {
Defines a method called clearWeights on the Board prototype.


  Object.keys(this.nodes).forEach(id => {
Loops over all the nodes on the board using Object.keys to get an array of all the node ids, and then uses forEach to iterate over each id.


    let currentNode = this.nodes[id];
    let currentHTMLNode = document.getElementById(id);
Assigns the current node object and corresponding HTML node to variables.


    if (currentNode.weight === 15) {
Checks if the current node has a weight of 15.


      currentNode.status = "unvisited";
      currentNode.weight = 0;
      currentHTMLNode.className = "unvisited";
If the current node has a weight of 15, then the node's status is set to "unvisited", weight is set to 0 and its corresponding HTML node's class is set to "unvisited". This effectively clears the weight from the node, making it the same as an unvisited node.

Finally, the method is closed with a closing brace:


  });
} */

Board.prototype.clearNodeStatuses = function() {
  Object.keys(this.nodes).forEach(id => {
    let currentNode = this.nodes[id];
    currentNode.previousNode = null;
    currentNode.distance = Infinity;
    currentNode.totalDistance = Infinity;
    currentNode.heuristicDistance = null;
    currentNode.storedDirection = currentNode.direction;
    currentNode.direction = null;
    let relevantStatuses = ["wall", "start", "target", "object"];
    if (!relevantStatuses.includes(currentNode.status)) {
      currentNode.status = "unvisited";
    }
  })
};
/*This code defines a method called clearNodeStatuses on the Board prototype. The purpose of this method is to clear all the status information associated with each node on the board, except for the relevant statuses: "wall", "start", "target", and "object".

Here's a line-by-line explanation of the code:

Board.prototype.clearNodeStatuses = function() {: This defines the method clearNodeStatuses on the Board prototype.

Object.keys(this.nodes).forEach(id => {: This iterates over all the node IDs on the board using Object.keys() and forEach().

let currentNode = this.nodes[id];: This line sets the current node to the node with the current ID.

currentNode.previousNode = null;: This line sets the previousNode property of the current node to null, which clears any previous node that was used to reach this node.

currentNode.distance = Infinity;: This line sets the distance property of the current node to Infinity, which clears any previously calculated distances to this node.

currentNode.totalDistance = Infinity;: This line sets the totalDistance property of the current node to Infinity, which clears any previously calculated total distances to this node.

currentNode.heuristicDistance = null;: This line sets the heuristicDistance property of the current node to null, which clears any previously calculated heuristic distances to this node.

currentNode.storedDirection = currentNode.direction;: This line sets the storedDirection property of the current node to the current direction property of the node, which saves the previous direction of the node before it was cleared.

currentNode.direction = null;: This line sets the direction property of the current node to null, which clears any previously calculated direction to this node.

let relevantStatuses = ["wall", "start", "target", "object"];: This line creates an array of the relevant statuses that should not be cleared.

if (!relevantStatuses.includes(currentNode.status)) {: This line checks if the status property of the current node is not included in the relevant statuses array.

currentNode.status = "unvisited";: This line sets the status property of the current node to "unvisited", which clears any other status that was previously assigned to this node.

});: This closes the forEach() loop and the clearNodeStatuses method.
 */

Board.prototype.instantAlgorithm = function() {
  let weightedAlgorithms = ["dijkstra", "CLA", "greedy"];
  let unweightedAlgorithms = ["dfs", "bfs"];
  let success;
  if (this.currentAlgorithm === "bidirectional") {
    if (!this.numberOfObjects) {
      success = bidirectional(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
      launchInstantAnimations(this, success, "weighted");
    } else {
      this.isObject = true;
    }
    this.algoDone = true;
  } else if (this.currentAlgorithm === "astar") {
    if (!this.numberOfObjects) {
      success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted");
    } else {
      this.isObject = true;
      success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted", "object", this.currentAlgorithm);
    }
    this.algoDone = true;
  }
  if (weightedAlgorithms.includes(this.currentAlgorithm)) {
    if (!this.numberOfObjects) {
      success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted");
    } else {
      this.isObject = true;
      success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted", "object", this.currentAlgorithm, this.currentHeuristic);
    }
    this.algoDone = true;
  } else if (unweightedAlgorithms.includes(this.currentAlgorithm)) {
    if (!this.numberOfObjects) {
      success = unweightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm);
      launchInstantAnimations(this, success, "unweighted");
    } else {
      this.isObject = true;
      success = unweightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm);
      launchInstantAnimations(this, success, "unweighted", "object", this.currentAlgorithm);
    }
    this.algoDone = true;
  }
};
/*
This code defines the instantAlgorithm method of the Board object.

The instantAlgorithm method is responsible for executing the currently selected algorithm instantly without showing any animations. It first defines two arrays: weightedAlgorithms and unweightedAlgorithms, which store the names of algorithms that require weighted and unweighted searches respectively.

Next, it checks the value of this.currentAlgorithm, which represents the currently selected algorithm. If it is set to "bidirectional", the method checks if there are any objects on the board. If there are no objects, it calls the bidirectional function, passing it the necessary arguments, and launches instant animations. If there are objects, it sets this.isObject to true. Finally, it sets this.algoDone to true.

If this.currentAlgorithm is set to "astar", the method checks if there are any objects on the board. If there are no objects, it calls the weightedSearchAlgorithm function, passing it the necessary arguments, and launches instant animations. If there are objects, it sets this.isObject to true, calls weightedSearchAlgorithm again with different arguments, and launches instant animations for the object search. Finally, it sets this.algoDone to true.

If this.currentAlgorithm is in weightedAlgorithms, the method checks if there are any objects on the board. If there are no objects, it calls weightedSearchAlgorithm, passing it the necessary arguments, and launches instant animations. If there are objects, it sets this.isObject to true, calls weightedSearchAlgorithm again with different arguments, and launches instant animations for the object search. Finally, it sets this.algoDone to true.

If this.currentAlgorithm is in unweightedAlgorithms, the method checks if there are any objects on the board. If there are no objects, it calls unweightedSearchAlgorithm, passing it the necessary arguments, and launches instant animations. If there are objects, it sets this.isObject to true, calls unweightedSearchAlgorithm again with different arguments, and launches instant animations for the object search. Finally, it sets this.algoDone to true.



Sure, here's an explanation of the instantAlgorithm method line by line:


Board.prototype.instantAlgorithm = function() {
This is the method definition for instantAlgorithm in the Board object.


  let weightedAlgorithms = ["dijkstra", "CLA", "greedy"];
  let unweightedAlgorithms = ["dfs", "bfs"];
These two variables define the lists of weighted and unweighted search algorithms.


  let success;
This variable will be used to store whether or not the search algorithm was successful.


  if (this.currentAlgorithm === "bidirectional") {
This if statement checks if the current algorithm is bidirectional.


    if (!this.numberOfObjects) {
      success = bidirectional(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
      launchInstantAnimations(this, success, "weighted");
If there are no objects on the board, the bidirectional search algorithm is called with the specified parameters, and the resulting success variable is passed into the launchInstantAnimations function with the "weighted" animation type.


    } else {
      this.isObject = true;
    }
    this.algoDone = true;
Otherwise, the isObject variable is set to true, and the algoDone variable is set to true.


  } else if (this.currentAlgorithm === "astar") {
This else if statement checks if the current algorithm is A*.


    if (!this.numberOfObjects) {
      success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted");
If there are no objects on the board, the weighted search algorithm is called with the specified parameters, and the resulting success variable is passed into the launchInstantAnimations function with the "weighted" animation type.


    } else {
      this.isObject = true;
      success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted", "object", this.currentAlgorithm);
    }
    this.algoDone = true;
Otherwise, the isObject variable is set to true, and the weighted search algorithm is called with the specified parameters for searching to the object. The resulting success variable is passed into the launchInstantAnimations function with the "weighted" animation type and additional parameters for the object search animation.


  }
  if (weightedAlgorithms.includes(this.currentAlgorithm)) {
If the current algorithm is a weighted search algorithm, this if statement is executed.


    if (!this.numberOfObjects) {
      success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success, "weighted");
If there are no objects on the board, the weighted search algorithm is called with the specified parameters, and the resulting success variable is passed into the launchInstantAnimations function with the "weighted" animation type.


    } else {
      this.isObject = true;
      success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
      launchInstantAnimations(this, success
*/
Board.prototype.redoAlgorithm = function() {
  this.clearPath();
  this.instantAlgorithm();
};
/*This is a method of the Board object which is used to redo the current algorithm. The method has two steps:

this.clearPath(): This method is called to clear any previously animated nodes and reset their status to unvisited.

this.instantAlgorithm(): This method is called to run the current algorithm again instantly without any animation.

In summary, this method clears the board of any previously animated nodes and immediately re-runs the current algorithm without any animation. */
Board.prototype.reset = function(objectNotTransparent) {
  this.nodes[this.start].status = "start";
  document.getElementById(this.start).className = "startTransparent";
  this.nodes[this.target].status = "target";
  if (this.object) {
    this.nodes[this.object].status = "object";
    if (objectNotTransparent) {
      document.getElementById(this.object).className = "visitedObjectNode";
    } else {
      document.getElementById(this.object).className = "objectTransparent";
    }
  }
};
/*
This is a method on the Board object prototype that resets the state of the board by setting the status of certain nodes to their original values and updating their corresponding HTML elements' classes. Here is a breakdown of each line:


this.nodes[this.start].status = "start";
The first line sets the status property of the start node to "start".


document.getElementById(this.start).className = "startTransparent";
This line gets the HTML element corresponding to the start node and sets its class to "startTransparent".


this.nodes[this.target].status = "target";
This line sets the status property of the target node to "target".


if (this.object) {
  this.nodes[this.object].status = "object";
  if (objectNotTransparent) {
    document.getElementById(this.object).className = "visitedObjectNode";
  } else {
    document.getElementById(this.object).className = "objectTransparent";
  }
}
These lines handle the object node (if it exists). If there is an object, its status property is set to "object". Depending on whether objectNotTransparent is true or false, the corresponding HTML element's class is set to either "visitedObjectNode" or "objectTransparent". If there is no object, these lines are skipped.

Overall, this method resets the status and appearance of certain nodes on the board to their original values. */
Board.prototype.resetHTMLNodes = function() {
  let start = document.getElementById(this.start);
  let target = document.getElementById(this.target);
  start.className = "start";
  target.className = "target";
};
/*
This code defines a method resetHTMLNodes on the Board prototype. This method is used to reset the classes of the HTML elements representing the start and target nodes on the board.

Here's a line-by-line explanation:


Board.prototype.resetHTMLNodes = function() {
This declares a new method called resetHTMLNodes on the Board prototype.


  let start = document.getElementById(this.start);
  let target = document.getElementById(this.target);
This gets the HTML elements representing the start and target nodes on the board by their IDs, which are stored as properties on the Board instance (this.start and this.target, respectively).


  start.className = "start";
  target.className = "target";
This resets the class of the start and target nodes' HTML elements to their default values. This will remove any styling that was applied to them (e.g. highlighting or animation) during previous algorithm runs or interactions with the user interface.



 */

Board.prototype.changeStartNodeImages = function() {
  let unweighted = ["bfs", "dfs"];
  let strikethrough = ["bfs", "dfs"];
  let guaranteed = ["dijkstra", "astar"];
  let name = "";
  if (this.currentAlgorithm === "bfs") {
    name = "Breath-first Search";
  } else if (this.currentAlgorithm === "dfs") {
    name = "Depth-first Search";
  } else if (this.currentAlgorithm === "dijkstra") {
    name = "Dijkstra's Algorithm";
  } else if (this.currentAlgorithm === "astar") {
    name = "A* Search";
  } else if (this.currentAlgorithm === "greedy") {
    name = "Greedy Best-first Search";
  } else if (this.currentAlgorithm === "CLA" && this.currentHeuristic !== "extraPoweredManhattanDistance") {
    name = "Swarm Algorithm";
  } else if (this.currentAlgorithm === "CLA" && this.currentHeuristic === "extraPoweredManhattanDistance") {
    name = "Convergent Swarm Algorithm";
  } else if (this.currentAlgorithm === "bidirectional") {
    name = "Bidirectional Swarm Algorithm";
  }
  if (unweighted.includes(this.currentAlgorithm)) {
    if (this.currentAlgorithm === "dfs") {
      document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>unweighted</b></i> and <i><b>does not guarantee</b></i> the shortest path!`;
    } else {
      document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>unweighted</b></i> and <i><b>guarantees</b></i> the shortest path!`;
    }
    document.getElementById("weightLegend").className = "strikethrough";
    for (let i = 0; i < 14; i++) {
      let j = i.toString();
      let backgroundImage = document.styleSheets["1"].rules[j].style.backgroundImage;
      document.styleSheets["1"].rules[j].style.backgroundImage = backgroundImage.replace("triangle", "spaceship");
    }
  } else {
    if (this.currentAlgorithm === "greedy" || this.currentAlgorithm === "CLA") {
      document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>weighted</b></i> and <i><b>does not guarantee</b></i> the shortest path!`;
    }
    document.getElementById("weightLegend").className = "";
    for (let i = 0; i < 14; i++) {
      let j = i.toString();
      let backgroundImage = document.styleSheets["1"].rules[j].style.backgroundImage;
      document.styleSheets["1"].rules[j].style.backgroundImage = backgroundImage.replace("spaceship", "triangle");
    }
  }
  if (this.currentAlgorithm === "bidirectional") {

    document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>weighted</b></i> and <i><b>does not guarantee</b></i> the shortest path!`;
    document.getElementById("bombLegend").className = "strikethrough";
    document.getElementById("startButtonAddObject").className = "navbar-inverse navbar-nav disabledA";
  } else {
    document.getElementById("bombLegend").className = "";
    document.getElementById("startButtonAddObject").className = "navbar-inverse navbar-nav";
  }
  if (guaranteed.includes(this.currentAlgorithm)) {
    document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>weighted</b></i> and <i><b>guarantees</b></i> the shortest path!`;
  }
};
/*
This code defines a function called changeStartNodeImages on the Board prototype object. The purpose of this function is to update the visualization of the start node and provide a description of the current algorithm being used.

The function starts by defining three arrays called unweighted, strikethrough, and guaranteed. These arrays contain the names of algorithms that fall into certain categories. unweighted contains the names of algorithms that do not use edge weights in their calculations, strikethrough contains the names of algorithms that do not guarantee the shortest path, and guaranteed contains the names of algorithms that do guarantee the shortest path.

The function then checks the current algorithm being used, which is stored in the currentAlgorithm property of the Board object. If the current algorithm is one of the algorithms that falls into a certain category, then the function updates the description of the algorithm accordingly, and changes the class of certain elements in the HTML document to indicate whether or not the algorithm is weighted and/or guarantees the shortest path.

If the current algorithm is unweighted, the function updates the algorithm description to indicate whether or not the algorithm guarantees the shortest path. If the current algorithm is weighted, the function updates the algorithm description to indicate whether or not the algorithm guarantees the shortest path and whether or not it uses heuristics. The function also updates the weight legend and changes the background image of certain elements to indicate whether or not the algorithm is weighted.

If the current algorithm is bidirectional, the function updates the algorithm description to indicate that it is weighted and does not guarantee the shortest path. It also changes the class of certain elements and disables the ability to add objects to the board. If the current algorithm is not bidirectional, the function enables the ability to add objects to the board.

Finally, the function updates the algorithm description to indicate whether or not the algorithm guarantees the shortest path. If the current algorithm is one of the algorithms that falls into the guaranteed array, then the function updates the algorithm description to indicate that it guarantees the shortest path.


Sure! Here's an explanation of the code Board.prototype.changeStartNodeImages line by line:


Board.prototype.changeStartNodeImages = function() {
This declares a function changeStartNodeImages as a property of the Board prototype.


  let unweighted = ["bfs", "dfs"];
  let strikethrough = ["bfs", "dfs"];
  let guaranteed = ["dijkstra", "astar"];
These lines declare three arrays unweighted, strikethrough, and guaranteed and initialize them with algorithm names.


  let name = "";
This declares a variable name and initializes it with an empty string.


  if (this.currentAlgorithm === "bfs") {
    name = "Breath-first Search";
  } else if (this.currentAlgorithm === "dfs") {
    name = "Depth-first Search";
  } else if (this.currentAlgorithm === "dijkstra") {
    name = "Dijkstra's Algorithm";
  } else if (this.currentAlgorithm === "astar") {
    name = "A* Search";
  } else if (this.currentAlgorithm === "greedy") {
    name = "Greedy Best-first Search";
  } else if (this.currentAlgorithm === "CLA" && this.currentHeuristic !== "extraPoweredManhattanDistance") {
    name = "Swarm Algorithm";
  } else if (this.currentAlgorithm === "CLA" && this.currentHeuristic === "extraPoweredManhattanDistance") {
    name = "Convergent Swarm Algorithm";
  } else if (this.currentAlgorithm === "bidirectional") {
    name = "Bidirectional Swarm Algorithm";
  }
This block of code checks the value of this.currentAlgorithm, which is a string representing the currently selected algorithm, and sets the name variable to a string representing the name of the algorithm.


  if (unweighted.includes(this.currentAlgorithm)) {
This line checks whether this.currentAlgorithm is included in the unweighted array.


    if (this.currentAlgorithm === "dfs") {
      document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>unweighted</b></i> and <i><b>does not guarantee</b></i> the shortest path!`;
    } else {
      document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>unweighted</b></i> and <i><b>guarantees</b></i> the shortest path!`;
    }
These lines set the HTML of an element with ID algorithmDescriptor to a string that includes the name of the algorithm and a message about whether the algorithm is guaranteed to find the shortest path or not.


    document.getElementById("weightLegend").className = "strikethrough";
This line sets the CSS class of an element with ID weightLegend to strikethrough.


    for (let i = 0; i < 14; i++) {
      let j = i.toString();
      let backgroundImage = document.styleSheets["1"].rules[j].style.backgroundImage;
      document.styleSheets["1"].rules[j].style.backgroundImage = backgroundImage.replace("triangle", "spaceship");
    }
This loop iterates through the first 14 CSS rules and replaces the background image of each rule that has a triangle background image with a spaceship background image.


  } else {
If this.currentAlgorithm is not in the unweighted array, this block of code is executed.

``
let guaranteed = ["dijkstra", "astar"];: create an array containing the names of algorithms that guarantee the shortest path.
let name = "";: initialize an empty string to store the name of the current algorithm.
if (this.currentAlgorithm === "bfs") { ... }: check if the current algorithm is BFS and set the corresponding name.
else if (this.currentAlgorithm === "dfs") { ... }: check if the current algorithm is DFS and set the corresponding name.
else if (this.currentAlgorithm === "dijkstra") { ... }: check if the current algorithm is Dijkstra's Algorithm and set the corresponding name.
else if (this.currentAlgorithm === "astar") { ... }: check if the current algorithm is A* Search and set the corresponding name.
else if (this.currentAlgorithm === "greedy") { ... }: check if the current algorithm is Greedy Best-first Search and set the corresponding name.
else if (this.currentAlgorithm === "CLA" && this.currentHeuristic !== "extraPoweredManhattanDistance") { ... }: check if the current algorithm is Swarm Algorithm and set the corresponding name.
else if (this.currentAlgorithm === "CLA" && this.currentHeuristic === "extraPoweredManhattanDistance") { ... }: check if the current algorithm is Convergent Swarm Algorithm and set the corresponding name.
else if (this.currentAlgorithm === "bidirectional") { ... }: check if the current algorithm is Bidirectional Swarm Algorithm and set the corresponding name.
if (unweighted.includes(this.currentAlgorithm)) { ... }: check if the current algorithm is unweighted (BFS or DFS) and update the algorithm descriptor and weight legend accordingly. Also, change the background image of the nodes to spaceships.
else { ... }: if the current algorithm is weighted, update the algorithm descriptor and weight legend accordingly. Also, change the background image of the nodes to triangles.
if (this.currentAlgorithm === "bidirectional") { ... }: if the current algorithm is bidirectional, update the algorithm descriptor, bomb legend, and disable the "Add Object" button.
else { ... }: if the current algorithm is not bidirectional, enable the "Add Object" button.
if (guaranteed.includes(this.currentAlgorithm)) { ... }: if the current algorithm guarantees the shortest path (Dijkstra's Algorithm or A* Search), update the algorithm descriptor accordingly.
*/
let counter = 1;
Board.prototype.toggleTutorialButtons = function() {

  document.getElementById("skipButton").onclick = () => {
    document.getElementById("tutorial").style.display = "none";
    this.toggleButtons();
  }

  if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").onclick = () => {
      if (counter < 9) counter++;
      nextPreviousClick();
      this.toggleTutorialButtons();
    }
  }

  document.getElementById("previousButton").onclick = () => {
    if (counter > 1) counter--;
    nextPreviousClick();
    this.toggleTutorialButtons()
  }

  let board = this;
  function nextPreviousClick() {
    if (counter === 1) {
      document.getElementById("tutorial").innerHTML = `<h3>Welcome to Pathfinding Visualizer!</h3><h6>This short tutorial will walk you through all of the features of this application.</h6><p>If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!</p><div id="tutorialCounter">1/9</div><img id="mainTutorialImage" src="public/styling/c_icon.png"><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 2) {
      document.getElementById("tutorial").innerHTML = `<h3>What is a pathfinding algorithm?</h3><h6>At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!</h6><p>All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.</p><div id="tutorialCounter">${counter}/9</div><img id="mainTutorialImage" src="public/styling/path.png"><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 3) {
      document.getElementById("tutorial").innerHTML = `<h3>Picking an algorithm</h3><h6>Choose an algorithm from the "Algorithms" drop-down menu.</h6><p>Note that some algorithms are <i><b>unweighted</b></i>, while others are <i><b>weighted</b></i>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path. </p><img id="secondTutorialImage" src="public/styling/algorithms.png"><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 4) {
      document.getElementById("tutorial").innerHTML = `<h3>Meet the algorithms</h3><h6>Not all algorithms are created equal.</h6><ul><li><b>Dijkstra's Algorithm</b> (weighted): the father of pathfinding algorithms; guarantees the shortest path</li><li><b>A* Search</b> (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm</li><li><b>Greedy Best-first Search</b> (weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path</li><li><b>Swarm Algorithm</b> (weighted): a mixture of Dijkstra's Algorithm and A*; does not guarantee the shortest-path</li><li><b>Convergent Swarm Algorithm</b> (weighted): the faster, more heuristic-heavy version of Swarm; does not guarantee the shortest path</li><li><b>Bidirectional Swarm Algorithm</b> (weighted): Swarm from both sides; does not guarantee the shortest path</li><li><b>Breath-first Search</b> (unweighted): a great algorithm; guarantees the shortest path</li><li><b>Depth-first Search</b> (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path</li></ul><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 5) {
      document.getElementById("tutorial").innerHTML = `<h3>Adding walls and weights</h3><h6>Click on the grid to add a wall. Click on the grid while pressing W to add a weight. Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.</h6><p>Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.</p><img id="secondTutorialImage" src="public/styling/walls.gif"><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 6) {
      document.getElementById("tutorial").innerHTML = `<h3>Adding a bomb</h3><h6>Click the "Add Bomb" button.</h6><p>Adding a bomb will change the course of the chosen algorithm. In other words, the algorithm will first look for the bomb (in an effort to diffuse it) and will then look for the target node. Note that the Bidirectional Swarm Algorithm does not support adding a bomb.</p><img id="secondTutorialImage" src="public/styling/bomb.png"><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 7) {
      document.getElementById("tutorial").innerHTML = `<h3>Dragging nodes</h3><h6>Click and drag the start, bomb, and target nodes to move them.</h6><p>Note that you can drag nodes even after an algorithm has finished running. This will allow you to instantly see different paths.</p><img src="public/styling/dragging.gif"><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 8) {
      document.getElementById("tutorial").innerHTML = `<h3>Visualizing and more</h3><h6>Use the navbar buttons to visualize algorithms and to do other stuff!</h6><p>You can clear the current path, clear walls and weights, clear the entire board, and adjust the visualization speed, all from the navbar. If you want to access this tutorial again, click on "Pathfinding Visualizer" in the top left corner of your screen.</p><img id="secondTutorialImage" src="public/styling/navbar.png"><div id="tutorialCounter">${counter}/9</div><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 9) {
      document.getElementById("tutorial").innerHTML = `<h3>Enjoy!</h3><h6>I hope you have just as much fun playing around with this visualization tool as I had building it!</h6><p>If you want to see the source code for this application, check out my <a href="https://github.com/clementmihailescu/Pathfinding-Visualizer">github</a>.</p><div id="tutorialCounter">${counter}/9</div><button id="finishButton" class="btn btn-default navbar-btn" type="button">Finish</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
      document.getElementById("finishButton").onclick = () => {
        document.getElementById("tutorial").style.display = "none";
        board.toggleButtons();
      }
    }
  }

};
/*
The code you provided seems to be for a Pathfinding Visualizer web application that offers a tutorial on how to use the application. It has a Board constructor function that initializes the board and various functions that handle the user interface for the tutorial.

The Board constructor function takes in two parameters, rows and cols, which represent the number of rows and columns on the board, respectively. It sets the properties rows and cols of the Board object to these values and initializes this.board as an empty array.

The createBoard function creates the HTML elements for the board and appends them to the DOM. It creates a div element with an id of "board" and sets its dimensions based on the number of rows and columns. It then creates a 2D array of Node objects with row and col properties, adds these nodes to this.board, and creates corresponding HTML elements for each node. Each HTML element is a div element with a unique id based on its row and col properties, and it is styled with CSS to appear as a square cell on the board. These HTML elements are then appended to the board's div element.

The getNeighbors function takes in a node parameter and returns an array of the node's neighboring nodes. It first initializes an empty neighbors array and creates an array of all possible neighbor positions relative to the node's position. It then loops through these positions and checks if each one is a valid position on the board. If it is, it pushes the corresponding neighbor node to the neighbors array. It then returns the neighbors array.

The toggleButtons function toggles the disabled state of the various buttons on the page based on whether the board is in a "start" or "end" state. If neither the start nor end node has been selected, all buttons are enabled. If the start node has been selected, the "Visualize" and "Clear Path" buttons are enabled, but the "Clear Walls" button is disabled. If both the start and end nodes have been selected, all buttons are enabled.

The toggleTutorialButtons function sets up the event listeners for the tutorial buttons and changes the tutorial text and image based on which step of the tutorial the user is on. It first sets up an event listener for the "Skip Tutorial" button that hides the tutorial and calls the toggleButtons function. If the "Next" button exists, it sets up an event listener for it that increments the counter variable and calls nextPreviousClick and toggleTutorialButtons. It also sets up an event listener for the "Previous" button that decrements the counter variable and calls nextPreviousClick and toggleTutorialButtons. Finally, it defines a nested function nextPreviousClick that changes the tutorial text and image based on the counter variable.
Sure! Here's an explanation of the toggleTutorialButtons() function line by line:


let counter = 1;
This declares a variable counter and initializes it to 1.


Board.prototype.toggleTutorialButtons = function() {
This declares a function toggleTutorialButtons and adds it as a method to the Board prototype.


  document.getElementById("skipButton").onclick = () => {
    document.getElementById("tutorial").style.display = "none";
    this.toggleButtons();
  }
This adds a click event listener to the "Skip Tutorial" button. When clicked, it hides the tutorial by setting its display property to "none", and then calls the toggleButtons() method on this object (presumably an instance of Board).


  if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").onclick = () => {
      if (counter < 9) counter++;
      nextPreviousClick();
      this.toggleTutorialButtons();
    }
  }
This checks if the "Next" button exists (i.e. if it's been rendered in the DOM), and if it does, adds a click event listener to it. When clicked, it increments the counter variable if it's less than 9, calls the nextPreviousClick() function, and then calls the toggleTutorialButtons() method on this object.


  document.getElementById("previousButton").onclick = () => {
    if (counter > 1) counter--;
    nextPreviousClick();
    this.toggleTutorialButtons()
  }
This adds a click event listener to the "Previous" button. When clicked, it decrements the counter variable if it's greater than 1, calls the nextPreviousClick() function, and then calls the toggleTutorialButtons() method on this object.


  let board = this;
  function nextPreviousClick() {
    if (counter === 1) {
      document.getElementById("tutorial").innerHTML = `<h3>Welcome to Pathfinding Visualizer!</h3><h6>This short tutorial will walk you through all of the features of this application.</h6><p>If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!</p><div id="tutorialCounter">1/9</div><img id="mainTutorialImage" src="public/styling/c_icon.png"><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="button">Previous</button><button id="skipButton" class="btn btn-default navbar-btn" type="button">Skip Tutorial</button>`
    } else if (counter === 2) {
      document.getElementById("tutorial").innerHTML = `<h3>What is a pathfinding algorithm?</h3><h6>At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!</h6><p>All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.</p><div id="tutorialCounter">${counter}/9</div><img id="mainTutorialImage" src="public/styling/path.png"><button id="nextButton" class="btn btn-default navbar-btn" type="button">Next</button><button id="previousButton" class="btn btn-default navbar-btn" type="
      

"purchased new equipment for the office"
This indicates that the company has acquired new equipment to use in their office, such as computers, printers, or furniture.

"signed a lease for a new building"
This means that the company has entered into a contractual agreement to rent a new building, likely for the purpose of expanding their operations or relocating to a better location.

"hired several new employees"
This suggests that the company is growing and needs additional staff to support its operations.

"launched a new product line"
This means that the company has introduced a new set of products to the market, likely in response to changing customer demands or to take advantage of new opportunities.

"partnered with another company"
This indicates that the company has formed a strategic partnership with another company, likely to collaborate on a specific project or to expand their reach in a particular market.

Overall, these updates suggest that the company is experiencing growth and expansion, and is taking steps to improve and innovate its operations.
*/

Board.prototype.toggleButtons = function() {
  document.getElementById("refreshButton").onclick = () => {
    window.location.reload(true);
  }

  if (!this.buttonsOn) {
    this.buttonsOn = true;

    document.getElementById("startButtonStart").onclick = () => {
      if (!this.currentAlgorithm) {
        document.getElementById("startButtonStart").innerHTML = '<button class="btn btn-default navbar-btn" type="button">Pick an Algorithm!</button>'
      } else {
        this.clearPath("clickedButton");
        this.toggleButtons();
        let weightedAlgorithms = ["dijkstra", "CLA", "CLA", "greedy"];
        let unweightedAlgorithms = ["dfs", "bfs"];
        let success;
        if (this.currentAlgorithm === "bidirectional") {
          if (!this.numberOfObjects) {
            success = bidirectional(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
            launchAnimations(this, success, "weighted");
          } else {
            this.isObject = true;
            success = bidirectional(this.nodes, this.start, this.object, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic, this);
            launchAnimations(this, success, "weighted");
          }
          this.algoDone = true;
        } else if (this.currentAlgorithm === "astar") {
          if (!this.numberOfObjects) {
            success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
            launchAnimations(this, success, "weighted");
          } else {
            this.isObject = true;
            success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
            launchAnimations(this, success, "weighted", "object", this.currentAlgorithm);
          }
          this.algoDone = true;
        } else if (weightedAlgorithms.includes(this.currentAlgorithm)) {
          if (!this.numberOfObjects) {
            success = weightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
            launchAnimations(this, success, "weighted");
          } else {
            this.isObject = true;
            success = weightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm, this.currentHeuristic);
            launchAnimations(this, success, "weighted", "object", this.currentAlgorithm, this.currentHeuristic);
          }
          this.algoDone = true;
        } else if (unweightedAlgorithms.includes(this.currentAlgorithm)) {
          if (!this.numberOfObjects) {
            success = unweightedSearchAlgorithm(this.nodes, this.start, this.target, this.nodesToAnimate, this.boardArray, this.currentAlgorithm);
            launchAnimations(this, success, "unweighted");
          } else {
            this.isObject = true;
            success = unweightedSearchAlgorithm(this.nodes, this.start, this.object, this.objectNodesToAnimate, this.boardArray, this.currentAlgorithm);
            launchAnimations(this, success, "unweighted", "object", this.currentAlgorithm);
          }
          this.algoDone = true;
        }
      }
    }

    document.getElementById("adjustFast").onclick = () => {
      this.speed = "fast";
      document.getElementById("adjustSpeed").innerHTML = 'Speed: Fast<span class="caret"></span>';
    }

    document.getElementById("adjustAverage").onclick = () => {
      this.speed = "average";
      document.getElementById("adjustSpeed").innerHTML = 'Speed: Average<span class="caret"></span>';
    }

    document.getElementById("adjustSlow").onclick = () => {
      this.speed = "slow";
      document.getElementById("adjustSpeed").innerHTML = 'Speed: Slow<span class="caret"></span>';
    }

    document.getElementById("startStairDemonstration").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.toggleButtons();
      stairDemonstration(this);
      mazeGenerationAnimations(this);
    }


    document.getElementById("startButtonBidirectional").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize Bidirectional Swarm!</button>'
      this.currentAlgorithm = "bidirectional";
      this.currentHeuristic = "manhattanDistance";
      if (this.numberOfObjects) {
        let objectNodeId = this.object;
        document.getElementById("startButtonAddObject").innerHTML = '<a href="#">Add a Bomb</a></li>';
        document.getElementById(objectNodeId).className = "unvisited";
        this.object = null;
        this.numberOfObjects = 0;
        this.nodes[objectNodeId].status = "unvisited";
        this.isObject = false;
      }
      this.clearPath("clickedButton");
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonDijkstra").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize Dijkstra\'s!</button>'
      this.currentAlgorithm = "dijkstra";
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonAStar").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize Swarm!</button>'
      this.currentAlgorithm = "CLA";
      this.currentHeuristic = "manhattanDistance"
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonAStar2").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize A*!</button>'
      this.currentAlgorithm = "astar";
      this.currentHeuristic = "poweredManhattanDistance"
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonAStar3").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize Convergent Swarm!</button>'
      this.currentAlgorithm = "CLA";
      this.currentHeuristic = "extraPoweredManhattanDistance"
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonGreedy").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize Greedy!</button>'
      this.currentAlgorithm = "greedy";
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonBFS").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize BFS!</button>'
      this.currentAlgorithm = "bfs";
      this.clearWeights();
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonDFS").onclick = () => {
      document.getElementById("startButtonStart").innerHTML = '<button id="actualStartButton" class="btn btn-default navbar-btn" type="button">Visualize DFS!</button>'
      this.currentAlgorithm = "dfs";
      this.clearWeights();
      this.changeStartNodeImages();
    }

    document.getElementById("startButtonCreateMazeOne").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.createMazeOne("wall");
    }

    document.getElementById("startButtonCreateMazeTwo").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.toggleButtons();
      recursiveDivisionMaze(this, 2, this.height - 3, 2, this.width - 3, "horizontal", false, "wall");
      mazeGenerationAnimations(this);
    }

    document.getElementById("startButtonCreateMazeWeights").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.createMazeOne("weight");
    }

    document.getElementById("startButtonClearBoard").onclick = () => {
      document.getElementById("startButtonAddObject").innerHTML = '<a href="#">Add Bomb</a></li>';



      let navbarHeight = document.getElementById("navbarDiv").clientHeight;
      let textHeight = document.getElementById("mainText").clientHeight + document.getElementById("algorithmDescriptor").clientHeight;
      let height = Math.floor((document.documentElement.clientHeight - navbarHeight - textHeight) / 28);
      let width = Math.floor(document.documentElement.clientWidth / 25);
      let start = Math.floor(height / 2).toString() + "-" + Math.floor(width / 4).toString();
      let target = Math.floor(height / 2).toString() + "-" + Math.floor(3 * width / 4).toString();

        Object.keys(this.nodes).forEach(id => {
          let currentNode = this.nodes[id];
          let currentHTMLNode = document.getElementById(id);
          if (id === start) {
            currentHTMLNode.className = "start";
            currentNode.status = "start";
          } else if (id === target) {
            currentHTMLNode.className = "target";
            currentNode.status = "target"
          } else {
            currentHTMLNode.className = "unvisited";
            currentNode.status = "unvisited";
          }
          currentNode.previousNode = null;
          currentNode.path = null;
          currentNode.direction = null;
          currentNode.storedDirection = null;
          currentNode.distance = Infinity;
          currentNode.totalDistance = Infinity;
          currentNode.heuristicDistance = null;
          currentNode.weight = 0;
          currentNode.relatesToObject = false;
          currentNode.overwriteObjectRelation = false;

        });
      this.start = start;
      this.target = target;
      this.object = null;
      this.nodesToAnimate = [];
      this.objectNodesToAnimate = [];
      this.shortestPathNodesToAnimate = [];
      this.objectShortestPathNodesToAnimate = [];
      this.wallsToAnimate = [];
      this.mouseDown = false;
      this.pressedNodeStatus = "normal";
      this.previouslyPressedNodeStatus = null;
      this.previouslySwitchedNode = null;
      this.previouslySwitchedNodeWeight = 0;
      this.keyDown = false;
      this.algoDone = false;
      this.numberOfObjects = 0;
      this.isObject = false;
    }

    document.getElementById("startButtonClearWalls").onclick = () => {
      this.clearWalls();
    }

    document.getElementById("startButtonClearPath").onclick = () => {
      this.clearPath("clickedButton");
    }

    document.getElementById("startButtonCreateMazeThree").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.toggleButtons();
      otherMaze(this, 2, this.height - 3, 2, this.width - 3, "vertical", false);
      mazeGenerationAnimations(this);
    }

    document.getElementById("startButtonCreateMazeFour").onclick = () => {
      this.clearWalls();
      this.clearPath("clickedButton");
      this.toggleButtons();
      otherOtherMaze(this, 2, this.height - 3, 2, this.width - 3, "horizontal", false);
      mazeGenerationAnimations(this);
    }

    document.getElementById("startButtonAddObject").onclick = () => {
      let innerHTML = document.getElementById("startButtonAddObject").innerHTML;
      if (this.currentAlgorithm !== "bidirectional") {
        if (innerHTML.includes("Add")) {
          let r = Math.floor(this.height / 2);
          let c = Math.floor(2 * this.width / 4);
          let objectNodeId = `${r}-${c}`;
          if (this.target === objectNodeId || this.start === objectNodeId || this.numberOfObjects === 1) {
            console.log("Failure to place object.");
          } else {
            document.getElementById("startButtonAddObject").innerHTML = '<a href="#">Remove Bomb</a></li>';
            this.clearPath("clickedButton");
            this.object = objectNodeId;
            this.numberOfObjects = 1;
            this.nodes[objectNodeId].status = "object";
            document.getElementById(objectNodeId).className = "object";
          }
        } else {
          let objectNodeId = this.object;
          document.getElementById("startButtonAddObject").innerHTML = '<a href="#">Add Bomb</a></li>';
          document.getElementById(objectNodeId).className = "unvisited";
          this.object = null;
          this.numberOfObjects = 0;
          this.nodes[objectNodeId].status = "unvisited";
          this.isObject = false;
          this.clearPath("clickedButton");
        }
      }

    }

    document.getElementById("startButtonClearPath").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonClearWalls").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonClearBoard").className = "navbar-inverse navbar-nav";
    if (this.currentAlgorithm !== "bidirectional") {
      document.getElementById("startButtonAddObject").className = "navbar-inverse navbar-nav";
    }
    document.getElementById("startButtonCreateMazeOne").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonCreateMazeTwo").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonCreateMazeThree").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonCreateMazeFour").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonCreateMazeWeights").className = "navbar-inverse navbar-nav";
    document.getElementById("startStairDemonstration").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonDFS").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonBFS").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonDijkstra").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonAStar").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonAStar2").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonAStar3").className = "navbar-inverse navbar-nav";
    document.getElementById("adjustFast").className = "navbar-inverse navbar-nav";
    document.getElementById("adjustAverage").className = "navbar-inverse navbar-nav";
    document.getElementById("adjustSlow").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonBidirectional").className = "navbar-inverse navbar-nav";
    document.getElementById("startButtonGreedy").className = "navbar-inverse navbar-nav";
    document.getElementById("actualStartButton").style.backgroundColor = "";

  } else {
    this.buttonsOn = false;
    document.getElementById("startButtonDFS").onclick = null;
    document.getElementById("startButtonBFS").onclick = null;
    document.getElementById("startButtonDijkstra").onclick = null;
    document.getElementById("startButtonAStar").onclick = null;
    document.getElementById("startButtonGreedy").onclick = null;
    document.getElementById("startButtonAddObject").onclick = null;
    document.getElementById("startButtonAStar2").onclick = null;
    document.getElementById("startButtonAStar3").onclick = null;
    document.getElementById("startButtonBidirectional").onclick = null;
    document.getElementById("startButtonCreateMazeOne").onclick = null;
    document.getElementById("startButtonCreateMazeTwo").onclick = null;
    document.getElementById("startButtonCreateMazeThree").onclick = null;
    document.getElementById("startButtonCreateMazeFour").onclick = null;
    document.getElementById("startButtonCreateMazeWeights").onclick = null;
    document.getElementById("startStairDemonstration").onclick = null;
    document.getElementById("startButtonClearPath").onclick = null;
    document.getElementById("startButtonClearWalls").onclick = null;
    document.getElementById("startButtonClearBoard").onclick = null;
    document.getElementById("startButtonStart").onclick = null;
    document.getElementById("adjustFast").onclick = null;
    document.getElementById("adjustAverage").onclick = null;
    document.getElementById("adjustSlow").onclick = null;

    document.getElementById("adjustFast").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("adjustAverage").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("adjustSlow").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonClearPath").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonClearWalls").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonClearBoard").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonAddObject").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonCreateMazeOne").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonCreateMazeTwo").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonCreateMazeThree").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonCreateMazeFour").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonCreateMazeWeights").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startStairDemonstration").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonDFS").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonBFS").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonDijkstra").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonAStar").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonGreedy").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonAStar2").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonAStar3").className = "navbar-inverse navbar-nav disabledA";
    document.getElementById("startButtonBidirectional").className = "navbar-inverse navbar-nav disabledA";

    document.getElementById("actualStartButton").style.backgroundColor = "rgb(185, 15, 15)";
  }


}
/*This code is a method called toggleButtons() of an object constructor function Board. The method is responsible for setting up the functionality of various buttons on a webpage. It does so by setting the onclick property of the corresponding HTML elements to anonymous arrow functions.

The refreshButton onclick function simply reloads the page.

The startButtonStart onclick function checks the current algorithm selected and calls the corresponding search algorithm function with the appropriate parameters. The launchAnimations() function is also called to initiate the animation of the search algorithm.

The adjustFast, adjustAverage, and adjustSlow onclick functions set the speed of the animation to either fast, average, or slow, respectively.

The startStairDemonstration onclick function clears any walls and paths on the board, and initiates a stair demonstration animation.

The startButtonBidirectional, startButtonDijkstra, and startButtonAStar onclick functions change the current algorithm selected and change the text of the startButtonStart button to the appropriate text.

Overall, the toggleButtons() method sets up the functionality of the buttons on the webpage for the pathfinding visualization tool. */

let navbarHeight = $("#navbarDiv").height();
let textHeight = $("#mainText").height() + $("#algorithmDescriptor").height();
let height = Math.floor(($(document).height() - navbarHeight - textHeight) / 28);
let width = Math.floor($(document).width() / 25);
let newBoard = new Board(height, width)
newBoard.initialise();

window.onkeydown = (e) => {
  newBoard.keyDown = e.keyCode;
}

window.onkeyup = (e) => {
  newBoard.keyDown = false;
}
/*

This code appears to be defining variables and functions related to a web-based game or application. Here is a breakdown of what is happening:

The first line sets the variable "navbarHeight" to the height of the element with the ID "navbarDiv". This suggests that there is a navigation bar somewhere on the page.

The second line sets the variable "textHeight" to the combined height of two other elements with IDs "mainText" and "algorithmDescriptor". This suggests that there is some sort of text-based content on the page.

The third line calculates the number of rows needed for the game board by subtracting the navbar height and text height from the total document height, then dividing the result by 28. This suggests that the game board is designed to be divided into square cells that are 28 pixels high.

The fourth line calculates the number of columns needed for the game board by dividing the document width by 25. This suggests that the cells are also 25 pixels wide.

The fifth line creates a new instance of the "Board" class with the calculated height and width, then calls its "initialise" method. This creates the game board with the specified dimensions and initializes it to its starting state.

The final two lines add event listeners for keydown and keyup events on the window object. When a key is pressed down, the "keyCode" property of the event object is assigned to the "keyDown" property of the Board object. When the key is released, the "keyDown" property is set to false. This suggests that the game involves user input from the keyboard.

Overall, it seems that this code sets up the basic framework for a web-based game with a square grid board, text content, and keyboard input. The details of the game logic are not provided in this code snippet.

Sure! Here is a detailed explanation of each line of code:

let navbarHeight = $("#navbarDiv").height();

This line declares a variable called navbarHeight and assigns it the height of the element with the ID "navbarDiv". The $ function is a shorthand way to access the jQuery library, and the height() function retrieves the height of the selected element.
let textHeight = $("#mainText").height() + $("#algorithmDescriptor").height();

This line declares a variable called textHeight and assigns it the sum of the heights of two elements with the IDs "mainText" and "algorithmDescriptor". It appears that these elements contain text content that is relevant to the game.
let height = Math.floor(($(document).height() - navbarHeight - textHeight) / 28);

This line declares a variable called height and calculates the number of rows that the game board should have based on the total document height, the height of the navbar, the height of the text elements, and the height of each cell. The Math.floor() function rounds the result down to the nearest integer.
let width = Math.floor($(document).width() / 25);

This line declares a variable called width and calculates the number of columns that the game board should have based on the document width and the width of each cell.
let newBoard = new Board(height, width)

This line declares a variable called newBoard and creates a new instance of the Board class with the calculated height and width.
newBoard.initialise();

This line calls the initialise() method on the newBoard object, which sets up the game board in its starting state.
window.onkeydown = (e) => { newBoard.keyDown = e.keyCode; }

This line sets up an event listener that listens for a keydown event on the window object. When a key is pressed down, the event handler function assigns the keyCode property of the event object to the keyDown property of the newBoard object.
window.onkeyup = (e) => { newBoard.keyDown = false; }

This line sets up an event listener that listens for a keyup event on the window object. When a key is released, the event handler function sets the keyDown property of the newBoard object to false.
In summary, this code sets up the dimensions and initial state of a game board, and adds event listeners to capture user keyboard input.
 */
},{"./animations/launchAnimations":1,"./animations/launchInstantAnimations":2,"./animations/mazeGenerationAnimations":3,"./getDistance":5,"./mazeAlgorithms/otherMaze":6,"./mazeAlgorithms/otherOtherMaze":7,"./mazeAlgorithms/recursiveDivisionMaze":8,"./mazeAlgorithms/simpleDemonstration":9,"./mazeAlgorithms/stairDemonstration":10,"./mazeAlgorithms/weightsDemonstration":11,"./node":12,"./pathfindingAlgorithms/astar":13,"./pathfindingAlgorithms/bidirectional":14,"./pathfindingAlgorithms/unweightedSearchAlgorithm":15,"./pathfindingAlgorithms/weightedSearchAlgorithm":16}],5:[function(require,module,exports){
function getDistance(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }
  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
}
/*
This code defines a function called getDistance that takes two arguments, nodeOne and nodeTwo. The function returns an array of three elements: the number of moves required to get from nodeOne to nodeTwo, an array of those moves, and the final direction the player will be facing after moving from nodeOne to nodeTwo.

The first two lines of the function extract the coordinates of nodeOne and nodeTwo from their respective id attributes, which are formatted as "x-y" strings. The parseInt function is used to convert these strings into numbers.

The next series of conditional statements determine the direction the player will be facing after moving from nodeOne to nodeTwo, depending on their current direction and the relative positions of the two nodes. The possible directions are "up", "down", "left", and "right".

The if and else if statements check if nodeTwo is above, below, to the left, or to the right of nodeOne and whether the player is currently facing up, down, left, or right. Depending on these conditions, the function returns an array that contains the number of moves required to get from nodeOne to nodeTwo, an array of those moves, and the final direction the player will be facing after making those moves.

The function does not actually move the player or update the game board; it only calculates the necessary information for doing so.
*


Sure, here's a detailed explanation of each line of code in the getDistance function:

javascript
Copy code
function getDistance(nodeOne, nodeTwo) {
This line defines a function called getDistance that takes two arguments: nodeOne and nodeTwo.

javascript
Copy code
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
These two lines extract the coordinates of nodeOne and nodeTwo from their respective id attributes, which are formatted as "x-y" strings. The split method is used to separate the x and y coordinates and create two separate strings for each node.

javascript
Copy code
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
These lines convert the strings for each node's x and y coordinates into integers using the parseInt function. The resulting values are stored in four separate variables: x1 and y1 for nodeOne, and x2 and y2 for nodeTwo.

javascript
Copy code
  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }
These conditional statements check whether nodeTwo is to the left or right of nodeOne by comparing their x coordinates. If nodeTwo is to the left of nodeOne, the function checks the player's current direction and returns an array of moves and a final direction based on that direction and the relative positions of the two nodes. If nodeTwo is to the right of nodeOne, the same process is repeated, but with different moves and directions based on the relative positions of the nodes.

javascript
Copy code
  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (
      
      If none of the previous conditions have been met, that means the target node is in the same row and column as the current node, so we don't need to turn. We only need to move forward, and the number of moves required will depend on the current direction of the node. If it's facing up or down, we only need to move one step forward. If it's facing left or right, we need to move two steps forward. The direction of the node will remain the same.
Finally, the function will return an array that contains three elements:

The number of moves required to reach the target node.
An array of commands that should be executed to move the robot according to the calculated path.
The new direction the robot will be facing after reaching the target node.
That's a brief explanation of the code. It seems to be a function that calculates the shortest path between two nodes on a grid, taking into account the direction the robot is facing and the number of moves required to reach the target node.
      */

module.exports = getDistance;

},{}],6:[function(require,module,exports){
function recursiveDivisionMaze(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    let relevantIds = [board.start, board.target];
    if (board.object) relevantIds.push(board.object);
    Object.keys(board.nodes).forEach(node => {
      if (!relevantIds.includes(node)) {
        let r = parseInt(node.split("-")[0]);
        let c = parseInt(node.split("-")[1]);
        if (r === 0 || c === 0 || r === board.height - 1 || c === board.width - 1) {
          let currentHTMLNode = document.getElementById(node);
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
    } else {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, "vertical", surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
    }
  }
};
/*

The code is a JavaScript function called recursiveDivisionMaze that generates a maze using the recursive division algorithm. The maze is represented by a 2D grid of nodes, each of which can be in one of several states (e.g. wall, path, start, target). The function takes in several parameters:

board: an object representing the maze grid
rowStart, rowEnd, colStart, colEnd: the boundaries of the section of the grid to operate on
orientation: either "horizontal" or "vertical", depending on which axis to divide the grid by
surroundingWalls: a boolean indicating whether the function should add walls around the perimeter of the grid
The function first checks if the current section of the grid is too small to divide, and if so, returns without doing anything. If surroundingWalls is not provided, it adds walls around the perimeter of the grid, except for any nodes that represent the start, target, or object locations.

If orientation is "horizontal", the function selects a random row within the specified boundaries, and adds walls to all nodes in that row except for a randomly selected column. It then recursively calls itself twice: once on the top half of the current section of the grid, and once on the bottom half. The orientation of the recursive calls alternates between "horizontal" and "vertical" to ensure that the maze is not biased in one direction.

If orientation is "vertical", the function selects a random column within the specified boundaries, and adds walls to all nodes in that column except for a randomly selected row. It then recursively calls itself twice: once on the left half of the current section of the grid, and once on the right half. The orientation of the recursive calls alternates between "vertical" and the previous orientation to ensure that the maze is not biased in one direction.

Throughout the function, any nodes that are turned into walls are added to an array called wallsToAnimate. This array can then be used to animate the maze generation process visually.

This code defines a function recursiveDivisionMaze that generates a maze using the recursive division algorithm.


function recursiveDivisionMaze(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
The function takes six arguments:

board: an object representing the grid that the maze is generated on
rowStart: an integer representing the starting row index of the maze section
rowEnd: an integer representing the ending row index of the maze section
colStart: an integer representing the starting column index of the maze section
colEnd: an integer representing the ending column index of the maze section
orientation: a string that can be either "horizontal" or "vertical", representing the orientation of the wall that will be drawn

  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
If the ending row or column index is less than the starting row or column index, the function returns and does not generate any more walls.


  if (!surroundingWalls) {
    let relevantIds = [board.start, board.target];
    if (board.object) relevantIds.push(board.object);
    Object.keys(board.nodes).forEach(node => {
      if (!relevantIds.includes(node)) {
        let r = parseInt(node.split("-")[0]);
        let c = parseInt(node.split("-")[1]);
        if (r === 0 || c === 0 || r === board.height - 1 || c === board.width - 1) {
          let currentHTMLNode = document.getElementById(node);
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    surroundingWalls = true;
  }
If surroundingWalls is falsy (i.e., undefined, null, false, 0, ""), the function identifies the start, target, and object nodes (if any) and sets the status of the nodes on the perimeter of the maze to "wall". These perimeter walls ensure that the maze is surrounded by walls and does not connect to any nodes outside of the maze.


  if (orientation === "horizontal") {
    // Generate walls in a horizontal orientation
  } else {
    // Generate walls in a vertical orientation
  }
};
The function then generates walls in either a horizontal or vertical orientation based on the orientation argument. The rest of the code is conditional based on the orientation, so I will explain the code for each orientation separately.

Orientation: horizontal

    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
This code creates two arrays of possible rows and columns to draw a wall between. The possible rows are all odd-numbered rows between rowStart and rowEnd. The possible columns are all odd-numbered columns between colStart - 1 and colEnd + 1. This is because we want to draw the wall between the cells with even-numbered row and column indices. The code then selects a random row and
*/
module.exports = recursiveDivisionMaze;

},{}],7:[function(require,module,exports){
function recursiveDivisionMaze(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    let relevantIds = [board.start, board.target];
    if (board.object) relevantIds.push(board.object);
    Object.keys(board.nodes).forEach(node => {
      if (!relevantIds.includes(node)) {
        let r = parseInt(node.split("-")[0]);
        let c = parseInt(node.split("-")[1]);
        if (r === 0 || c === 0 || r === board.height - 1 || c === board.width - 1) {
          let currentHTMLNode = document.getElementById(node);
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, "horizontal", surroundingWalls);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
    } else {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          board.nodes[node].status = "wall";
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
    }
  }
};
/*

This is a JavaScript function that generates a maze on a given board using the recursive division algorithm. The function takes in six parameters: board, rowStart, rowEnd, colStart, colEnd, orientation, and surroundingWalls.

The board parameter represents the board object that the maze is being generated on. This object contains properties such as nodes, which is an object that maps node IDs to their corresponding node objects, start, which is the ID of the start node, target, which is the ID of the target node, and object, which is the ID of an optional object node.

The rowStart, rowEnd, colStart, and colEnd parameters represent the range of rows and columns on the board that the maze generation algorithm should consider. These parameters are used to divide the board recursively into smaller and smaller sub-grids until the maze is complete.

The orientation parameter is either "horizontal" or "vertical", and it determines which direction the maze generation algorithm should divide the board at each step. The algorithm alternates between horizontal and vertical divisions to create the maze.

The surroundingWalls parameter is a boolean value that indicates whether the algorithm should generate walls around the outer edge of the board. If this parameter is false, the function generates walls around the outer edge of the board before it starts dividing the board recursively.

The function works by first checking if the surroundingWalls parameter is false, and if so, it generates walls around the outer edge of the board. Then it checks if the base case has been reached (i.e., if the range of rows or columns is less than or equal to 0), and if so, it returns. If the base case has not been reached, the function selects a random row or column to divide the board on, generates walls in that row or column except for a randomly selected gap, and then recursively calls itself on the two resulting sub-grids.

The function adds the walls that it generates to the board.wallsToAnimate array and sets the status of the corresponding node objects to "wall". This array is later used to animate the process of generating the maze.
*/
module.exports = recursiveDivisionMaze;

},{}],8:[function(require,module,exports){
function recursiveDivisionMaze(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, type) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    let relevantIds = [board.start, board.target];
    if (board.object) relevantIds.push(board.object);
    Object.keys(board.nodes).forEach(node => {
      if (!relevantIds.includes(node)) {
        let r = parseInt(node.split("-")[0]);
        let c = parseInt(node.split("-")[1]);
        if (r === 0 || c === 0 || r === board.height - 1 || c === board.width - 1) {
          let currentHTMLNode = document.getElementById(node);
          board.wallsToAnimate.push(currentHTMLNode);
          if (type === "wall") {
            board.nodes[node].status = "wall";
            board.nodes[node].weight = 0;
          } else if (type === "weight") {
            board.nodes[node].status = "unvisited";
            board.nodes[node].weight = 15;
          }
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          if (type === "wall") {
            board.nodes[node].status = "wall";
            board.nodes[node].weight = 0;
          } else if (type === "weight") {
            board.nodes[node].status = "unvisited";
            board.nodes[node].weight = 15;
          }        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, type);
    } else {
      recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls, type);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, type);
    } else {
      recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, type);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    Object.keys(board.nodes).forEach(node => {
      let r = parseInt(node.split("-")[0]);
      let c = parseInt(node.split("-")[1]);
      if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
        let currentHTMLNode = document.getElementById(node);
        if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
          board.wallsToAnimate.push(currentHTMLNode);
          if (type === "wall") {
            board.nodes[node].status = "wall";
            board.nodes[node].weight = 0;
          } else if (type === "weight") {
            board.nodes[node].status = "unvisited";
            board.nodes[node].weight = 15;
          }        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls, type);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, type);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, type);
    } else {
      recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, type);
    }
  }
};
/*This code is a JavaScript implementation of the recursive division maze generation algorithm. This algorithm is used to generate a maze in a two-dimensional grid, where there is a starting point and an endpoint, and the goal is to find a path between the two points. The maze is generated by dividing the grid into two sections and creating a wall between them. The wall has a gap in it that forms the path. The division is repeated recursively, with the gaps in each wall being randomly placed, until the entire grid is filled with walls and gaps.

The function recursiveDivisionMaze takes in several parameters:

board: an object representing the grid
rowStart: the starting row of the grid
rowEnd: the ending row of the grid
colStart: the starting column of the grid
colEnd: the ending column of the grid
orientation: either "horizontal" or "vertical", indicating the orientation of the wall being created
surroundingWalls: a boolean indicating whether the surrounding walls of the grid have already been created
type: either "wall" or "weight", indicating whether the algorithm should create walls or weights (weights are used to simulate weighted graphs, where the cost of traversing a path is proportional to the weight).
The function generates a maze by dividing the grid recursively into two sections and creating a wall between them. If the orientation is "horizontal", the function creates a wall with a gap at a randomly selected row and column, and then recursively divides the grid into two sections above and below the wall. If the orientation is "vertical", the function creates a wall with a gap at a randomly selected column and row, and then recursively divides the grid into two sections to the left and right of the wall.

The function also creates surrounding walls for the grid if they have not already been created. These walls are added to the board object and the HTML elements representing these walls are added to the wallsToAnimate array.

Depending on the type parameter, the function either creates walls or weights. If type is "wall", the nodes representing the cells in the grid are set to have a status of "wall" and a weight of 0. If type is "weight", the nodes are set to have a status of "unvisited" and a weight of 15.

The function returns nothing, but the walls and weights created by the function are added to the wallsToAnimate array, which is used to animate the creation of the maze on the grid. */
module.exports = recursiveDivisionMaze;

},{}],9:[function(require,module,exports){
function simpleDemonstration(board) {
  let currentIdY = board.width - 10;
  for (let counter = 0; counter < 7; counter++) {
    let currentIdXOne = Math.floor(board.height / 2) - counter;
    let currentIdXTwo = Math.floor(board.height / 2) + counter;
    let currentIdOne = `${currentIdXOne}-${currentIdY}`;
    let currentIdTwo = `${currentIdXTwo}-${currentIdY}`;
    let currentElementOne = document.getElementById(currentIdOne);
    let currentElementTwo = document.getElementById(currentIdTwo);
    board.wallsToAnimate.push(currentElementOne);
    board.wallsToAnimate.push(currentElementTwo);
    let currentNodeOne = board.nodes[currentIdOne];
    let currentNodeTwo = board.nodes[currentIdTwo];
    currentNodeOne.status = "wall";
    currentNodeOne.weight = 0;
    currentNodeTwo.status = "wall";
    currentNodeTwo.weight = 0;
  }
}
/*
This code generates a simple demonstration maze on the board using walls. It creates a vertical line of walls that are 7 nodes tall, 10 nodes away from the right edge of the board.

The code loops through 7 times, generating two walls on each iteration. On each iteration, it calculates the current X coordinates for the top and bottom walls, which are placed 1 node apart from each other. It then creates the IDs for both wall nodes, gets their respective HTML elements from the DOM, and adds them to the wallsToAnimate array, which is used later to animate the walls being generated.

After getting the wall nodes, the code retrieves their corresponding Node objects from the nodes dictionary on the board. It sets the status of both nodes to "wall" and the weight to 0, indicating that these nodes cannot be traversed.

Overall, this code generates a simple, symmetrical maze for demonstration purposes.
*/
module.exports = simpleDemonstration;

},{}],10:[function(require,module,exports){
function stairDemonstration(board) {
  let currentIdX = board.height - 1;
  let currentIdY = 0;
  let relevantStatuses = ["start", "target", "object"];
  while (currentIdX > 0 && currentIdY < board.width) {
    let currentId = `${currentIdX}-${currentIdY}`;
    let currentNode = board.nodes[currentId];
    let currentHTMLNode = document.getElementById(currentId);
    if (!relevantStatuses.includes(currentNode.status)) {
      currentNode.status = "wall";
      board.wallsToAnimate.push(currentHTMLNode);
    }
    currentIdX--;
    currentIdY++;
  }
  while (currentIdX < board.height - 2 && currentIdY < board.width) {
    let currentId = `${currentIdX}-${currentIdY}`;
    let currentNode = board.nodes[currentId];
    let currentHTMLNode = document.getElementById(currentId);
    if (!relevantStatuses.includes(currentNode.status)) {
      currentNode.status = "wall";
      board.wallsToAnimate.push(currentHTMLNode);
    }
    currentIdX++;
    currentIdY++;
  }
  while (currentIdX > 0 && currentIdY < board.width - 1) {
    let currentId = `${currentIdX}-${currentIdY}`;
    let currentNode = board.nodes[currentId];
    let currentHTMLNode = document.getElementById(currentId);
    if (!relevantStatuses.includes(currentNode.status)) {
      currentNode.status = "wall";
      board.wallsToAnimate.push(currentHTMLNode);
    }
    currentIdX--;
    currentIdY++;
  }
}
/*
This code defines a function called stairDemonstration which takes a board object as an argument. The purpose of this function is to add walls to the board in a specific pattern to create a staircase-like shape.

The function starts by setting the currentIdX variable to the bottom row of the board and currentIdY to 0. It then enters a while loop that continues as long as currentIdX is greater than 0 and currentIdY is less than the width of the board. Inside the while loop, the function retrieves the current node and corresponding HTML element from the board object using the current currentId and checks if the status of the node is not in the array of relevant statuses (start, target, object). If the status is not relevant, the function sets the status of the node to wall and pushes the HTML element to the wallsToAnimate array of the board object. Finally, the function increments currentIdX and currentIdY to move up and to the right.

After the first while loop, the function enters two more while loops with similar logic to create the remaining steps of the staircase-like shap
*/
module.exports = stairDemonstration;

},{}],11:[function(require,module,exports){
function weightsDemonstration(board) {
  let currentIdX = board.height - 1;
  let currentIdY = 35;
  while (currentIdX > 5) {
    let currentId = `${currentIdX}-${currentIdY}`;
    let currentElement = document.getElementById(currentId);
    board.wallsToAnimate.push(currentElement);
    let currentNode = board.nodes[currentId];
    currentNode.status = "wall";
    currentNode.weight = 0;
    currentIdX--;
  }
  for (let currentIdX = board.height - 2; currentIdX > board.height - 11; currentIdX--) {
    for (let currentIdY = 1; currentIdY < 35; currentIdY++) {
      let currentId = `${currentIdX}-${currentIdY}`;
      let currentElement = document.getElementById(currentId);
      board.wallsToAnimate.push(currentElement);
      let currentNode = board.nodes[currentId];
      if (currentIdX === board.height - 2 && currentIdY < 35 && currentIdY > 26) {
        currentNode.status = "wall";
        currentNode.weight = 0;
      } else {
        currentNode.status = "unvisited";
        currentNode.weight = 15;
      }
    }
  }
}
/*
This function is a demonstration of a weighted graph on a given board. It takes in a board object and modifies the status and weight properties of nodes to create a specific pattern of walls and weights.

The function first sets the starting position of the wall pattern at the bottom left of the board (currentIdX = board.height - 1 and currentIdY = 35). It then loops through a series of node positions in a diagonal line upwards towards the right of the board. At each position, it sets the node's status property to "wall" and its weight property to 0. This creates a diagonal line of walls extending upwards and to the right from the starting position.

Next, the function loops through a set of node positions that create a rectangular shape on the board, excluding the previously created wall pattern. For nodes within the rectangle but not on its boundary, the status property is set to "unvisited" and the weight property is set to 15. For nodes on the boundary of the rectangle, the status property is set to "wall" and the weight property is set to 0, with the exception of a small gap at the top right of the rectangle.

Finally, the function adds all nodes with a modified status or weight property to the wallsToAnimate property of the board object, which is later used to animate the visualization of the board.

*/
module.exports = weightsDemonstration;

},{}],12:[function(require,module,exports){
function Node(id, status) {
  this.id = id;
  this.status = status;
  this.previousNode = null;
  this.path = null;
  this.direction = null;
  this.storedDirection = null;
  this.distance = Infinity;
  this.totalDistance = Infinity;
  this.heuristicDistance = null;
  this.weight = 0;
  this.relatesToObject = false;
  this.overwriteObjectRelation = false;

  this.otherid = id;
  this.otherstatus = status;
  this.otherpreviousNode = null;
  this.otherpath = null;
  this.otherdirection = null;
  this.otherstoredDirection = null;
  this.otherdistance = Infinity;
  this.otherweight = 0;
  this.otherrelatesToObject = false;
  this.otheroverwriteObjectRelation = false;
}
/*

This code defines a constructor function called Node which is used to create node objects with specific properties. The constructor takes two arguments: id and status, which are used to uniquely identify each node and indicate its current status (e.g. whether it is a wall, start, or end node).

Each node object has the following properties:

id: a unique identifier for the node, typically in the format "row-col" where row and col represent the node's position on the grid.
status: a string that indicates the node's current status (e.g. "start", "end", "wall", or "unvisited").
previousNode: a reference to the node that was visited immediately prior to this node in the shortest path.
path: a string that indicates the direction to take to reach this node from the previous node (e.g. "up", "down", "left", or "right").
direction: a string that indicates the overall direction of the path taken to reach this node from the start node (e.g. "up", "down", "left", or "right").
storedDirection: a string that indicates the direction of the path taken to reach this node from the previous node, used for animating the pathfinding algorithm.
distance: the current shortest known distance from the start node to this node, initialized as infinity.
totalDistance: the sum of distance and heuristicDistance.
heuristicDistance: the estimated distance from this node to the end node, calculated using a heuristic function (e.g. manhattan distance).
weight: a number that can be added to the cost of moving to this node, used to simulate weighted grids.
relatesToObject: a boolean value indicating whether this node is part of a group of nodes that are related to an object on the grid (e.g. nodes surrounding a wall or obstacle).
overwriteObjectRelation: a boolean value indicating whether this node's relationship to an object on the grid has been overwritten by a more recent search.
Additionally, each node object has another set of properties that are used in certain pathfinding algorithms (e.g. bidirectional search). These properties have the same meaning as their counterparts listed above, but with the prefix "other".
*/
module.exports = Node;

},{}],13:[function(require,module,exports){
function astar(nodes, start, target, nodesToAnimate, boardArray, name, heuristic) {
  if (!start || !target || start === target) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].totalDistance = 0;
  nodes[start].direction = "up";
  let unvisitedNodes = Object.keys(nodes);
  while (unvisitedNodes.length) {
    let currentNode = closestNode(nodes, unvisitedNodes);
    while (currentNode.status === "wall" && unvisitedNodes.length) {
      currentNode = closestNode(nodes, unvisitedNodes)
    }
    if (currentNode.distance === Infinity) return false;
    nodesToAnimate.push(currentNode);
    currentNode.status = "visited";
    if (currentNode.id === target) {
      return "success!";
    }
    updateNeighbors(nodes, currentNode, boardArray, target, name, start, heuristic);
  }
}
/*
This code exports a function called astar that takes in several parameters including nodes, start, target, nodesToAnimate, boardArray, name, and heuristic.

The function first checks if the start and target nodes are valid, and if they are not, it returns false.

If the nodes are valid, the function initializes the distance and totalDistance properties of the start node to 0, and sets its direction property to "up".

Then, the function initializes an array called unvisitedNodes with the keys of the nodes object.

The function then enters a loop that continues as long as unvisitedNodes is not empty. Inside this loop, the function finds the closest unvisited node to the start node using the closestNode function, and continues to find the closest node until it finds a node that is not a wall or until unvisitedNodes is empty.

If the distance property of the current node is set to Infinity, the function returns false. Otherwise, the function pushes the current node to the nodesToAnimate array, sets its status to "visited", and checks if it is the target node. If it is the target, the function returns "success!".

Finally, the function updates the neighbors of the current node using the updateNeighbors function.
*/
function closestNode(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.totalDistance > nodes[unvisitedNodes[i]].totalDistance) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    } else if (currentClosest.totalDistance === nodes[unvisitedNodes[i]].totalDistance) {
      if (currentClosest.heuristicDistance > nodes[unvisitedNodes[i]].heuristicDistance) {
        currentClosest = nodes[unvisitedNodes[i]];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}
/*
This function takes two arguments, nodes and unvisitedNodes, and returns the closest node from the nodes object that is still in the unvisitedNodes array.

Here's how it works:

It initializes two variables, currentClosest and index, to undefined.
It loops through the unvisitedNodes array using a for loop.
Inside the loop, it checks if currentClosest is undefined or if the totalDistance property of the current node in nodes is less than the totalDistance property of currentClosest. If so, it updates currentClosest to the current node and sets index to the current index in the unvisitedNodes array.
If the totalDistance property of the current node is equal to that of currentClosest, it checks if the heuristicDistance property of the current node is less than that of currentClosest. If so, it updates currentClosest to the current node and sets index to the current index in the unvisitedNodes array.
After the loop finishes, it removes the closest node from the unvisitedNodes array using the splice() method and returns the closest node.
In other words, this function implements the core logic of the A* algorithm for finding the closest unvisited node.
*/
function updateNeighbors(nodes, node, boardArray, target, name, start, heuristic) {
  let neighbors = getNeighbors(node.id, nodes, boardArray);
  for (let neighbor of neighbors) {
    if (target) {
      updateNode(node, nodes[neighbor], nodes[target], name, nodes, nodes[start], heuristic, boardArray);
    } else {
      updateNode(node, nodes[neighbor]);
    }
  }
}
/*This code defines a function called updateNeighbors that updates the distances of neighboring nodes of the given node. It takes in the following parameters:

nodes: an object representing all the nodes on the board
node: the node whose neighbors are being updated
boardArray: a two-dimensional array representing the board and the status of each node
target: the target node for the pathfinding algorithm (optional)
name: the name of the pathfinding algorithm being used
start: the starting node for the pathfinding algorithm
heuristic: the heuristic function being used (optional)
The function first calls the getNeighbors function to get an array of neighboring nodes for the given node.

It then loops through each neighboring node and calls the updateNode function on it, passing in the following parameters:

node: the current node
nodes[neighbor]: the neighboring node being updated
nodes[target] (optional): the target node for the pathfinding algorithm
name: the name of the pathfinding algorithm being used
nodes[start]: the starting node for the pathfinding algorithm
heuristic (optional): the heuristic function being used
The updateNode function updates the distance of the neighboring node based on its distance from the current node and the target node (if provided), as well as its weight and path direction. It also sets the previous node and path for the neighboring node.

Overall, this function updates the distances of neighboring nodes of a given node based on the current pathfinding algorithm being used. */
function updateNode(currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, boardArray) {
  let distance = getDistance(currentNode, targetNode);
  if (!targetNode.heuristicDistance) targetNode.heuristicDistance = manhattanDistance(targetNode, actualTargetNode);
  let distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}
/*
This is a function called updateNode that updates the properties of a given targetNode based on the currentNode, actualTargetNode, name, nodes, actualStartNode, heuristic, and boardArray.

The getDistance function is called with the currentNode and targetNode as arguments, and the result is assigned to distance. This function returns an array containing the distance between the two nodes, the path between them, and the direction to travel along that path.

If the heuristicDistance property of the targetNode is not defined, it is set to the Manhattan distance between the targetNode and the actualTargetNode. This is calculated using the manhattanDistance function, which takes two nodes as arguments, splits their IDs into coordinates, calculates the absolute differences between the x and y coordinates, and returns the sum of those differences.

distanceToCompare is calculated as the sum of the currentNode's distance, the targetNode's weight, and the distance between them.

If distanceToCompare is less than targetNode.distance, then targetNode.distance is updated to distanceToCompare, targetNode.totalDistance is updated to the sum of targetNode.distance and targetNode.heuristicDistance, targetNode.previousNode is set to the currentNode's ID, targetNode.path is set to distance[1], and targetNode.direction is set to distance[2].

Overall, this function is used in pathfinding algorithms to update the properties of a target node based on the current node and other relevant parameters, in order to find the shortest path to the target node.
*/
function getNeighbors(id, nodes, boardArray) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x + 1] && boardArray[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  // if (boardArray[x - 1] && boardArray[x - 1][y - 1]) {
  //   potentialNeighbor = `${(x - 1).toString()}-${(y - 1).toString()}`
  //   let potentialWallOne = `${(x - 1).toString()}-${y.toString()}`
  //   let potentialWallTwo = `${x.toString()}-${(y - 1).toString()}`
  //   if (nodes[potentialNeighbor].status !== "wall" && !(nodes[potentialWallOne].status === "wall" && nodes[potentialWallTwo].status === "wall")) neighbors.push(potentialNeighbor);
  // }
  // if (boardArray[x + 1] && boardArray[x + 1][y - 1]) {
  //   potentialNeighbor = `${(x + 1).toString()}-${(y - 1).toString()}`
  //   let potentialWallOne = `${(x + 1).toString()}-${y.toString()}`
  //   let potentialWallTwo = `${x.toString()}-${(y - 1).toString()}`
  //   if (nodes[potentialNeighbor].status !== "wall" && !(nodes[potentialWallOne].status === "wall" && nodes[potentialWallTwo].status === "wall")) neighbors.push(potentialNeighbor);
  // }
  // if (boardArray[x - 1] && boardArray[x - 1][y + 1]) {
  //   potentialNeighbor = `${(x - 1).toString()}-${(y + 1).toString()}`
  //   let potentialWallOne = `${(x - 1).toString()}-${y.toString()}`
  //   let potentialWallTwo = `${x.toString()}-${(y + 1).toString()}`
  //   if (nodes[potentialNeighbor].status !== "wall" && !(nodes[potentialWallOne].status === "wall" && nodes[potentialWallTwo].status === "wall")) neighbors.push(potentialNeighbor);
  // }
  // if (boardArray[x + 1] && boardArray[x + 1][y + 1]) {
  //   potentialNeighbor = `${(x + 1).toString()}-${(y + 1).toString()}`
  //   let potentialWallOne = `${(x + 1).toString()}-${y.toString()}`
  //   let potentialWallTwo = `${x.toString()}-${(y + 1).toString()}`
  //   if (nodes[potentialNeighbor].status !== "wall" && !(nodes[potentialWallOne].status === "wall" && nodes[potentialWallTwo].status === "wall")) neighbors.push(potentialNeighbor);
  // }
  return neighbors;
}


function getDistance(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  } /*else if (x2 < x1 && y2 < y1) {
    if (nodeOne.direction === "up") {
      return [1.5, ["f"], "up-left"];
    } else if (nodeOne.direction === "right") {
      return [2.5, ["l", "f"], "up-left"];
    } else if (nodeOne.direction === "left") {
      return [1.5, ["r", "f"], "up-left"];
    } else if (nodeOne.direction === "down") {
      return [2.5, ["r", "r", "f"], "up-left"];
    } else if (nodeOne.direction === "up-right") {
      return [2, null, "up-left"];
    } else if (nodeOne.direction === "down-right") {
      return [3, null, "up-left"];
    } else if (nodeOne.direction === "up-left") {
      return [1, null, "up-left"];
    } else if (nodeOne.direction === "down-left") {
      return [2, null, "up-left"];
    }
  } else if (x2 < x1 && y2 > y1) {
    if (nodeOne.direction === "up") {
      return [1.5, ["f"], "up-right"];
    } else if (nodeOne.direction === "right") {
      return [1.5, ["l", "f"], "up-right"];
    } else if (nodeOne.direction === "left") {
      return [2.5, ["r", "f"], "up-right"];
    } else if (nodeOne.direction === "down") {
      return [2.5, ["r", "r", "f"], "up-right"];
    } else if (nodeOne.direction === "up-right") {
      return [1, null, "up-right"];
    } else if (nodeOne.direction === "down-right") {
      return [2, null, "up-right"];
    } else if (nodeOne.direction === "up-left") {
      return [2, null, "up-right"];
    } else if (nodeOne.direction === "down-left") {
      return [3, null, "up-right"];
    }
  } else if (x2 > x1 && y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2.5, ["f"], "down-right"];
    } else if (nodeOne.direction === "right") {
      return [1.5, ["l", "f"], "down-right"];
    } else if (nodeOne.direction === "left") {
      return [2.5, ["r", "f"], "down-right"];
    } else if (nodeOne.direction === "down") {
      return [1.5, ["r", "r", "f"], "down-right"];
    } else if (nodeOne.direction === "up-right") {
      return [2, null, "down-right"];
    } else if (nodeOne.direction === "down-right") {
      return [1, null, "down-right"];
    } else if (nodeOne.direction === "up-left") {
      return [3, null, "down-right"];
    } else if (nodeOne.direction === "down-left") {
      return [2, null, "down-right"];
    }
  } else if (x2 > x1 && y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2.5, ["f"], "down-left"];
    } else if (nodeOne.direction === "right") {
      return [2.5, ["l", "f"], "down-left"];
    } else if (nodeOne.direction === "left") {
      return [1.5, ["r", "f"], "down-left"];
    } else if (nodeOne.direction === "down") {
      return [1.5, ["r", "r", "f"], "down-left"];
    } else if (nodeOne.direction === "up-right") {
      return [3, null, "down-left"];
    } else if (nodeOne.direction === "down-right") {
      return [2, null, "down-left"];
    } else if (nodeOne.direction === "up-left") {
      return [2, null, "down-left"];
    } else if (nodeOne.direction === "down-left") {
      return [1, null, "down-left"];
    }
  }*/
}

function manhattanDistance(nodeOne, nodeTwo) {
  let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
  let xOne = nodeOneCoordinates[0];
  let xTwo = nodeTwoCoordinates[0];
  let yOne = nodeOneCoordinates[1];
  let yTwo = nodeTwoCoordinates[1];

  let xChange = Math.abs(xOne - xTwo);
  let yChange = Math.abs(yOne - yTwo);

  return (xChange + yChange);
}

/*
This is a JavaScript function named manhattanDistance that calculates the Manhattan distance between two nodes in a grid. Here is an explanation of each line of the function:


let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
These two lines extract the coordinates of the two nodes by splitting their id property (which is a string representing their position on the grid, such as "1-2" for the node at row 1, column 2) at the "-" character and converting each part to an integer. The resulting arrays contain the x and y coordinates of the two nodes, respectively.


let xOne = nodeOneCoordinates[0];
let xTwo = nodeTwoCoordinates[0];
let yOne = nodeOneCoordinates[1];
let yTwo = nodeTwoCoordinates[1];
These lines assign the x and y coordinates of each node to separate variables, for easier use in the subsequent calculations.


let xChange = Math.abs(xOne - xTwo);
let yChange = Math.abs(yOne - yTwo);
These lines calculate the absolute difference between the x and y coordinates of the two nodes.


return (xChange + yChange);
This line returns the sum of the x and y changes as the Manhattan distance between the two nodes.
*/

module.exports = astar;

},{}],14:[function(require,module,exports){
const astar = require("./astar");

function bidirectional(nodes, start, target, nodesToAnimate, boardArray, name, heuristic, board) {
  if (name === "astar") return astar(nodes, start, target, nodesToAnimate, boardArray, name)
  if (!start || !target || start === target) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].direction = "right";
  nodes[target].otherdistance = 0;
  nodes[target].otherdirection = "left";
  let visitedNodes = {};
  let unvisitedNodesOne = Object.keys(nodes);
  let unvisitedNodesTwo = Object.keys(nodes);
  while (unvisitedNodesOne.length && unvisitedNodesTwo.length) {
    let currentNode = closestNode(nodes, unvisitedNodesOne);
    let secondCurrentNode = closestNodeTwo(nodes, unvisitedNodesTwo);
    while ((currentNode.status === "wall" || secondCurrentNode.status === "wall") && unvisitedNodesOne.length && unvisitedNodesTwo.length) {
      if (currentNode.status === "wall") currentNode = closestNode(nodes, unvisitedNodesOne);
      if (secondCurrentNode.status === "wall") secondCurrentNode = closestNodeTwo(nodes, unvisitedNodesTwo);
    }
    if (currentNode.distance === Infinity || secondCurrentNode.otherdistance === Infinity) {
      return false;
    }
    nodesToAnimate.push(currentNode);
    nodesToAnimate.push(secondCurrentNode);
    currentNode.status = "visited";
    secondCurrentNode.status = "visited";
    if (visitedNodes[currentNode.id]) {
      board.middleNode = currentNode.id;
      return "success";
    } else if (visitedNodes[secondCurrentNode.id]) {
      board.middleNode = secondCurrentNode.id;
      return "success";
    } else if (currentNode === secondCurrentNode) {
      board.middleNode = secondCurrentNode.id;
      return "success";
    }
    visitedNodes[currentNode.id] = true;
    visitedNodes[secondCurrentNode.id] = true;
    updateNeighbors(nodes, currentNode, boardArray, target, name, start, heuristic);
    updateNeighborsTwo(nodes, secondCurrentNode, boardArray, start, name, target, heuristic);
  }
}
/*
This code exports a function called bidirectional that implements the bidirectional A* algorithm for finding the shortest path between two nodes on a grid.

The function takes several parameters including:

nodes: an object containing all the nodes in the grid
start and target: the IDs of the start and target nodes respectively
nodesToAnimate: an array that keeps track of the nodes that are animated during the search process
boardArray: a 2D array representing the grid
name: the name of the algorithm to be used (in this case, A*)
heuristic: the heuristic function to be used to estimate the distance between nodes
board: an object containing information about the grid (such as its width and height)
The function first checks if the algorithm is A* and if so, calls the A* function instead of bidirectional search.

Then, it sets the distance and direction of the start and target nodes, and initializes two lists of unvisited nodes (unvisitedNodesOne and unvisitedNodesTwo). The algorithm will start searching from both the start and target nodes simultaneously.

The main while loop continues until one of the two lists of unvisited nodes becomes empty. At each iteration of the loop, the function selects the node with the smallest total distance (currentNode from unvisitedNodesOne and secondCurrentNode from unvisitedNodesTwo) and checks if it is a wall node. If it is a wall node, the algorithm ignores it and continues to the next smallest node.

If the selected node is not a wall node, it is added to nodesToAnimate and its status is changed to "visited". If the selected node has already been visited from the other direction, or if it is the same node, the algorithm has found a path and the function returns "success". Otherwise, the function updates the neighbors of both the selected node and its counterpart in the other list of unvisited nodes, and continues the search.

If there is no path found, the function returns false. The middle node in the path is also stored in the board object.
Sure, here's an explanation of each line of code:

const astar = require("./astar");

This line imports the A* algorithm function from another file called astar.js. The require function is a built-in Node.js function that allows you to import modules from other files.
function bidirectional(nodes, start, target, nodesToAnimate, boardArray, name, heuristic, board) {

This line declares a function called bidirectional that takes in several parameters:
nodes: an object representing all the nodes on the board
start: the id of the starting node
target: the id of the target node
nodesToAnimate: an array that stores the nodes that will be animated to show the path
boardArray: a 2D array that represents the board
name: the name of the algorithm being used
heuristic: the heuristic function being used
board: an object that represents the board and contains additional properties
if (name === "astar") return astar(nodes, start, target, nodesToAnimate, boardArray, name)

This line checks if the algorithm being used is A* by comparing the name parameter to the string "astar". If it is, the function immediately returns the result of calling the astar function with the provided parameters.
if (!start || !target || start === target) { return false; }

This line checks if the start and target parameters are valid. If either of them is falsy (i.e. null, undefined, or false) or if they have the same value, the function returns false.
nodes[start].distance = 0;

This line sets the distance property of the starting node to 0. This property will be used later to keep track of the shortest distance from the starting node to each of the other nodes.
nodes[start].direction = "right";

This line sets the direction property of the starting node to "right". This property will be used later to keep track of the direction of the path.
nodes[target].otherdistance = 0;

This line sets the otherdistance property of the target node to 0. This property will be used later to keep track of the shortest distance from the target node to each of the other nodes.
nodes[target].otherdirection = "left";

This line sets the otherdirection property of the target node to "left". This property will be used later to keep track of the direction of the path.
let visitedNodes = {};

This line declares an empty object called visitedNodes. This object will be used to keep track of the nodes that have already been visited by the algorithm.
let unvisitedNodesOne = Object.keys(nodes);

This line initializes a variable called unvisitedNodesOne with an array of all the node ids. This array will be used to keep track of the nodes that have not yet been visited by the algorithm.
let unvisitedNodesTwo = Object.keys(nodes);

This line initializes a variable called unvisitedNodesTwo with the same array of node ids as unvisitedNodesOne. This variable will be used by the second search that starts at the target node and works its way back to the start node.
while (unvisitedNodesOne.length && unvisitedNodesTwo.length) {

This line starts a while loop that will continue as long as there are unvisited nodes in both `
*/

function closestNode(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.distance > nodes[unvisitedNodes[i]].distance) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}
/*

This function finds the closest node from a list of unvisited nodes based on the distance value stored in the node objects. Here is a line-by-line explanation:


function closestNode(nodes, unvisitedNodes) {
This function takes in two arguments: the nodes object containing all the nodes in the graph, and an array unvisitedNodes that contains the IDs of all the unvisited nodes.


let currentClosest, index;
This initializes two variables currentClosest and index. currentClosest will hold the closest node found so far, and index will hold the index of that node in the unvisitedNodes array.


for (let i = 0; i < unvisitedNodes.length; i++) {
This is a for loop that iterates through each node ID in the unvisitedNodes array.


if (!currentClosest || currentClosest.distance > nodes[unvisitedNodes[i]].distance) {
This if statement checks if either currentClosest is not defined (i.e., this is the first node being checked), or if the distance value of the current node being checked is smaller than the distance value of the current closest node.


currentClosest = nodes[unvisitedNodes[i]];
index = i;
If the current node being checked is closer than the current closest node, currentClosest is updated to hold the current node, and index is updated to hold the index of the current node in the unvisitedNodes array.


unvisitedNodes.splice(index, 1);
After the closest node is found, this line removes the node from the unvisitedNodes array so that it will not be checked again in the future.


return currentClosest;
Finally, the function returns the closest node found from the unvisitedNodes array.
*/

function closestNodeTwo(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.otherdistance > nodes[unvisitedNodes[i]].otherdistance) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}
/*This function takes two arguments: nodes and unvisitedNodes. nodes is an object that contains all the nodes on the graph, and unvisitedNodes is an array that contains the IDs of the nodes that have not been visited yet.

The function iterates through the unvisitedNodes array and compares the otherdistance property of each node with the otherdistance property of the currentClosest node. If the currentClosest node is null or the otherdistance property of the current node is less than the otherdistance property of the currentClosest node, the current node becomes the new currentClosest node.

After iterating through all the unvisitedNodes, the function removes the currentClosest node from the unvisitedNodes array using the splice() method, and returns the currentClosest node.

This function is used in the A* algorithm with an alternate heuristic to find the closest unvisited node to the starting node that also takes into account the estimated distance from the current node to the target node. */


/*

This function takes two parameters: nodes, an object containing all the nodes on the board, and unvisitedNodes, an array containing the IDs of nodes that have not been visited yet. It returns the node in unvisitedNodes that has the smallest otherdistance property, which represents the distance from the starting node to the current node.

The function starts by initializing two variables, currentClosest and index. These will be used to keep track of the node with the smallest otherdistance and its position in the unvisitedNodes array, respectively.

Then, the function loops through all the nodes in unvisitedNodes using a for loop. For each node, it checks if currentClosest is null or if the otherdistance of the current node is smaller than that of currentClosest. If either of these conditions is true, currentClosest is set to the current node and index is set to the current index in the unvisitedNodes array.

After the loop finishes, the function removes the node with the smallest otherdistance from unvisitedNodes using the splice() method with index as the starting index and 1 as the number of elements to remove.

Finally, the function returns the node with the smallest otherdistance.
*/

function updateNeighbors(nodes, node, boardArray, target, name, start, heuristic) {
  let neighbors = getNeighbors(node.id, nodes, boardArray);
  for (let neighbor of neighbors) {
    updateNode(node, nodes[neighbor], nodes[target], name, nodes, nodes[start], heuristic, boardArray);
  }
}
/*
This code defines a function called updateNeighbors that takes in several parameters: nodes, node, boardArray, target, name, start, and heuristic.

Here's what each parameter represents:

nodes: an object containing all nodes in the grid with their respective properties
node: the current node whose neighbors will be updated
boardArray: a two-dimensional array representing the grid
target: the target node in the grid
name: the name of the algorithm being used
start: the starting node in the grid
heuristic: the heuristic function being used to estimate distances
The function first calls the getNeighbors function with the id of the node, nodes, and boardArray as parameters. This function returns an array of the node's neighbors.

Then, using a for...of loop, the function loops through each neighbor and calls the updateNode function with several parameters: node as the current node, nodes[neighbor] as the target node, nodes[target] as the actual target node, name, nodes[start] as the actual start node, heuristic, and boardArray.

The updateNode function updates the distance, previous node, path, and direction properties of the target node if the distance to the node plus the weight and the heuristic estimate to the target node is less than the current distance of the target node.

In summary, updateNeighbors updates the distance, previous node, path, and direction properties of each neighbor of the node by calling the updateNode function.
*/
function updateNeighborsTwo(nodes, node, boardArray, target, name, start, heuristic) {
  let neighbors = getNeighbors(node.id, nodes, boardArray);
  for (let neighbor of neighbors) {
    updateNodeTwo(node, nodes[neighbor], nodes[target], name, nodes, nodes[start], heuristic, boardArray);
  }
}
/*

This function takes in the following parameters:

nodes: an object containing all nodes in the grid, with each node's id as its key
node: the current node whose neighbors are being updated
boardArray: a 2D array representing the grid of nodes
target: the id of the target node
name: the name of the algorithm being used
start: the id of the starting node
heuristic: the heuristic function being used
The function first calls the getNeighbors function to get an array of node's neighboring nodes. It then loops through each neighbor and calls the updateNodeTwo function on each neighbor, passing in the current node as the source node, the neighbor node as the target node, and other relevant parameters.

The updateNodeTwo function updates the targetNode's distance and other properties if the calculated distance to reach it through the current node is less than its current distance. This function uses the A* algorithm with a modified heuristic function that takes into account the other distance of a node (i.e., the distance traveled so far in the opposite direction).

In summary, updateNeighborsTwo updates the properties of the neighboring nodes of the current node based on the A* algorithm with a modified heuristic function.




*/

function updateNode(currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, boardArray) {
  let distance = getDistance(currentNode, targetNode);
  let weight = targetNode.weight === 15 ? 15 : 1;
  let distanceToCompare = currentNode.distance + (weight + distance[0]) * manhattanDistance(targetNode, actualTargetNode);
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}
/*


This is a function called updateNode that updates the properties of a given node based on its current distance from the starting node and the distance to a target node. The function takes in the following parameters:

currentNode: the current node being evaluated
targetNode: the target node being searched for
actualTargetNode: the actual target node, used for calculating the heuristic value
name: a string representing the name of the algorithm being used (not used in this function)
nodes: an object containing all nodes in the grid
actualStartNode: the actual starting node, used for calculating the heuristic value
heuristic: a string representing the type of heuristic being used (not used in this function)
boardArray: a two-dimensional array representing the grid
Here's a breakdown of the code line by line:


let distance = getDistance(currentNode, targetNode);
This line calls the getDistance function to determine the distance between the current node and the target node. The getDistance function returns an array containing the distance between the nodes, an array of directions to reach the target node, and the final direction to face when reaching the target node.


let weight = targetNode.weight === 15 ? 15 : 1;
This line sets the weight variable to either 15 or 1 depending on the weight of the target node. If the weight is 15 (indicating a node that is a wall), the weight is set to 15. Otherwise, it is set to 1.


let distanceToCompare = currentNode.distance + (weight + distance[0]) * manhattanDistance(targetNode, actualTargetNode);
This line calculates the distance to compare for the target node. It takes into account the current distance to the node (currentNode.distance), the weight of the node (weight), the distance between the current node and the target node (distance[0]), and the heuristic value between the target node and the actual target node (manhattanDistance(targetNode, actualTargetNode)).


if (distanceToCompare < targetNode.distance) {
  targetNode.distance = distanceToCompare;
  targetNode.previousNode = currentNode.id;
  targetNode.path = distance[1];
  targetNode.direction = distance[2];
}
This block of code updates the properties of the target node if the calculated distance (distanceToCompare) is less than the node's current distance (targetNode.distance). If this condition is met, the targetNode.distance property is set to distanceToCompare, the targetNode.previousNode property is set to the current node's ID, and the targetNode.path and targetNode.direction properties are set to the values returned by the getDistance function. These properties are used to track the path to the target node.
*/

function updateNodeTwo(currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, boardArray) {
  let distance = getDistanceTwo(currentNode, targetNode);
  let weight = targetNode.weight === 15 ? 15 : 1;
  let distanceToCompare = currentNode.otherdistance + (weight + distance[0]) * manhattanDistance(targetNode, actualTargetNode);
  if (distanceToCompare < targetNode.otherdistance) {
    targetNode.otherdistance = distanceToCompare;
    targetNode.otherpreviousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.otherdirection = distance[2];
  }
}
/*

This code defines a function updateNodeTwo that takes several parameters including currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, and boardArray.

The function first calls another function getDistanceTwo to calculate the distance between currentNode and targetNode and assigns the result to the distance variable.

The code then checks the weight of the targetNode. If it's 15, the weight is assigned to weight variable; otherwise, weight is assigned a value of 1.

Next, the function calculates distanceToCompare by adding the otherdistance value of currentNode to (weight + distance[0]) multiplied by the Manhattan distance between targetNode and actualTargetNode.

If distanceToCompare is less than the otherdistance value of targetNode, then the targetNode is updated with the new otherdistance value, the id of the currentNode as otherpreviousNode, the path from currentNode to targetNode as path, and the direction from currentNode to targetNode as otherdirection.

In summary, this function updates the targetNode with the new otherdistance value and other related properties if a better path to the targetNode is found from the currentNode. This function is used in the A* algorithm to update the properties of nodes during the search process.





Sure, here is an explanation of the code:


function updateNodeTwo(currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, boardArray) {
This is a function called updateNodeTwo that takes in several parameters: currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, and boardArray. The purpose of this function is to update the targetNode based on the currentNode.


let distance = getDistanceTwo(currentNode, targetNode);
This line of code calls a function called getDistanceTwo with currentNode and targetNode as arguments and assigns the result to the distance variable.


let weight = targetNode.weight === 15 ? 15 : 1;
This line of code checks if targetNode.weight is equal to 15. If it is, weight is assigned the value of 15. Otherwise, weight is assigned the value of 1.


let distanceToCompare = currentNode.otherdistance + (weight + distance[0]) * manhattanDistance(targetNode, actualTargetNode);
This line of code calculates the distanceToCompare by adding the otherdistance property of the currentNode to the product of (weight + distance[0]) and the Manhattan distance between targetNode and actualTargetNode. The Manhattan distance is calculated using the manhattanDistance function, which is not shown in this code snippet.


if (distanceToCompare < targetNode.otherdistance) {
This line of code checks if distanceToCompare is less than the otherdistance property of the targetNode.


targetNode.otherdistance = distanceToCompare;
targetNode.otherpreviousNode = currentNode.id;
targetNode.path = distance[1];
targetNode.otherdirection = distance[2];
If the previous condition is true, this code block updates the targetNode properties with the new values. otherdistance is updated with distanceToCompare, otherpreviousNode is updated with the id property of the currentNode, path is updated with the second element of the distance array, and otherdirection is updated with the third element of the distance array.

Overall, this function is used to update the properties of the targetNode based on the currentNode and the distance between them, taking into account the weights and the Manhattan distance between the target node and the actual target node.
*/

function getNeighbors(id, nodes, boardArray) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x + 1] && boardArray[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  return neighbors;
}
/*
This is a function named getNeighbors which takes three parameters - id, nodes, and boardArray.

The id parameter represents the id of a particular node for which we want to get the neighbors.

The nodes parameter is an object which contains information about all the nodes on the board, such as their status (wall, start, end, or unvisited), id, distance from the start node, etc.

The boardArray parameter is a 2D array which represents the actual board where the nodes are present. It contains information about the status of each cell on the board.

The function first splits the given id parameter into x and y coordinates. It then initializes an empty neighbors array to store the neighboring nodes.

The function then checks for four potential neighbors of the current node - one above, one below, one to the left, and one to the right. For each potential neighbor, it first checks if it is present on the board (i.e., it does not go beyond the boundaries of the board). If it is present, the function gets the id of the potential neighbor by concatenating its x and y coordinates.

If the status of the potential neighbor is not a wall (i.e., it is either unvisited, the start node, or the end node), then it is added to the neighbors array.

Finally, the function returns the neighbors array containing the ids of all the neighbors of the current node that are not walls.
here's an explanation of each line of the getNeighbors function:


function getNeighbors(id, nodes, boardArray) {
This declares a function called getNeighbors that takes in three parameters: an id string, a nodes object, and a boardArray array.


let coordinates = id.split("-");
let x = parseInt(coordinates[0]);
let y = parseInt(coordinates[1]);
This first splits the id string into an array of two strings using the hyphen as a separator, and then assigns those strings to the coordinates variable. The parseInt function is then used to convert these two strings into integers, which are assigned to x and y respectively.


let neighbors = [];
let potentialNeighbor;
These two lines declare two variables: an empty array called neighbors that will eventually hold the neighboring node ids, and an uninitialized variable called potentialNeighbor that will be used later.


if (boardArray[x - 1] && boardArray[x - 1][y]) {
  potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This block of code checks if the node to the left of the current node exists on the board by looking at the boardArray. If it does, it constructs a string potentialNeighbor that represents the id of the node to the left, and checks if this node is not a wall node in the nodes object. If it's not a wall, then it pushes the potentialNeighbor onto the neighbors array.


if (boardArray[x + 1] && boardArray[x + 1][y]) {
  potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This block of code does the same thing as the previous one, but checks for the node to the right of the current node.


if (boardArray[x][y - 1]) {
  potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This block of code checks if the node above the current node exists on the board, and if it does, it constructs a string potentialNeighbor that represents the id of the node above. If it's not a wall, then it pushes the potentialNeighbor onto the neighbors array.


if (boardArray[x][y + 1]) {
  potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This block of code does the same thing as the previous one, but checks for the node below the current node.


return neighbors;
}
This line returns the neighbors array, which contains the ids of all the neighboring nodes that are not walls.




*/
function getDistance(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }
  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
}
/*

This function takes two node objects (nodeOne and nodeTwo) as input and returns a list of instructions to move from nodeOne to nodeTwo. The instructions are represented as a list of steps and a direction to face after completing the steps.

let currentCoordinates = nodeOne.id.split("-");: This line gets the id property of nodeOne, which is a string in the format "x-y", and splits it into an array of two strings using "-" as the separator. This creates an array currentCoordinates containing the x and y coordinates of nodeOne.
let targetCoordinates = nodeTwo.id.split("-");: This line gets the id property of nodeTwo, which is also a string in the format "x-y", and splits it into an array of two strings using "-" as the separator. This creates an array targetCoordinates containing the x and y coordinates of nodeTwo.
let x1 = parseInt(currentCoordinates[0]);: This line parses the first element of currentCoordinates as an integer using parseInt() and assigns it to the variable x1. This is the x-coordinate of nodeOne.
let y1 = parseInt(currentCoordinates[1]);: This line parses the second element of currentCoordinates as an integer using parseInt() and assigns it to the variable y1. This is the y-coordinate of nodeOne.
let x2 = parseInt(targetCoordinates[0]);: This line parses the first element of targetCoordinates as an integer using parseInt() and assigns it to the variable x2. This is the x-coordinate of nodeTwo.
let y2 = parseInt(targetCoordinates[1]);: This line parses the second element of targetCoordinates as an integer using parseInt() and assigns it to the variable y2. This is the y-coordinate of nodeTwo.
The following lines use conditional statements (if and else if) to determine the direction to move in to reach nodeTwo, based on the difference between the x-coordinates and y-coordinates of nodeOne and nodeTwo.
If x2 is less than x1, the function checks the direction nodeOne is facing and returns a list of instructions to move up, left, or right depending on the direction. The number of steps and the direction to face after completing the steps are determined by the direction nodeOne is facing.
If x2 is greater than x1, the function checks the direction nodeOne is facing and returns a list of instructions to move down, left, or right depending on the direction. The number of steps and the direction to face after completing the steps are determined by the direction nodeOne is facing.
If y2 is less than y1, the function checks the direction nodeOne is facing and returns a list of instructions to move left, up, or down depending on the direction. The number of steps and the direction to face after completing the steps are determined by the direction nodeOne is facing.
If y2 is greater than y1, the function checks the direction nodeOne is facing and returns a list of instructions to move right, up, or down depending on the direction. The number of steps and the direction to face after completing the steps are determined by the direction nodeOne is facing.
*/
function getDistanceTwo(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.otherdirection === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.otherdirection === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.otherdirection === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.otherdirection === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.otherdirection === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.otherdirection === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.otherdirection === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.otherdirection === "down") {
      return [1, ["f"], "down"];
    }
  }
  if (y2 < y1) {
    if (nodeOne.otherdirection === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.otherdirection === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.otherdirection === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.otherdirection === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.otherdirection === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.otherdirection === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.otherdirection === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.otherdirection === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
}
/*
This code defines a function called "getDistanceTwo" which takes in two arguments "nodeOne" and "nodeTwo" and returns an array with three values.

The function first extracts the coordinates of "nodeOne" and "nodeTwo" by splitting their "id" attributes at the "-" separator and converting each coordinate to an integer using the "parseInt" function. These coordinates are assigned to variables "x1", "y1", "x2", and "y2".

The function then checks if the x-coordinate of "nodeTwo" is less than or greater than the x-coordinate of "nodeOne". If it is less than, the function checks the "otherdirection" attribute of "nodeOne" and returns an array of instructions to move the "nodeOne" in the "up" direction. If it is greater than, the function checks the "otherdirection" attribute of "nodeOne" and returns an array of instructions to move the "nodeOne" in the "down" direction.

If the x-coordinates are equal, the function checks if the y-coordinate of "nodeTwo" is less than or greater than the y-coordinate of "nodeOne". If it is less than, the function checks the "otherdirection" attribute of "nodeOne" and returns an array of instructions to move the "nodeOne" in the "left" direction. If it is greater than, the function checks the "otherdirection" attribute of "nodeOne" and returns an array of instructions to move the "nodeOne" in the "right" direction.

The array of instructions returned by the function consists of three values. The first value indicates the number of steps required to reach "nodeTwo" from "nodeOne". The second value is an array of instructions to follow to reach "nodeTwo" from "nodeOne". The third value is the direction in which the "nodeOne" is facing after reaching "nodeTwo".

Sure, here's an explanation of the code line by line:


function getDistanceTwo(nodeOne, nodeTwo) {
This declares a function called getDistanceTwo that takes in two parameters, nodeOne and nodeTwo.


let currentCoordinates = nodeOne.id.split("-");
let targetCoordinates = nodeTwo.id.split("-");
These lines create two variables called currentCoordinates and targetCoordinates, which are arrays of strings. They are created by splitting the id properties of nodeOne and nodeTwo (which are assumed to be in the format "x-y") into arrays of strings using "-" as the separator.


let x1 = parseInt(currentCoordinates[0]);
let y1 = parseInt(currentCoordinates[1]);
let x2 = parseInt(targetCoordinates[0]);
let y2 = parseInt(targetCoordinates[1]);
These lines create four variables called x1, y1, x2, and y2, which are integers. They are created by parsing the first and second elements of currentCoordinates and targetCoordinates into integers using the parseInt() function.


if (x2 < x1) {
  if (nodeOne.otherdirection === "up") {
    return [1, ["f"], "up"];
  } else if (nodeOne.otherdirection === "right") {
    return [2, ["l", "f"], "up"];
  } else if (nodeOne.otherdirection === "left") {
    return [2, ["r", "f"], "up"];
  } else if (nodeOne.otherdirection === "down") {
    return [3, ["r", "r", "f"], "up"];
  }
} else if (x2 > x1) {
  if (nodeOne.otherdirection === "up") {
    return [3, ["r", "r", "f"], "down"];
  } else if (nodeOne.otherdirection === "right") {
    return [2, ["r", "f"], "down"];
  } else if (nodeOne.otherdirection === "left") {
    return [2, ["l", "f"], "down"];
  } else if (nodeOne.otherdirection === "down") {
    return [1, ["f"], "down"];
  }
}
These lines check if x2 is less than x1 or greater than x1. Depending on the comparison result and the otherdirection property of nodeOne, the function returns an array with specific values.

if (y2 < y1) {
  if (nodeOne.otherdirection === "up") {
    return [2, ["l", "f"], "left"];
  } else if (nodeOne.otherdirection === "right") {
    return [3, ["l", "l", "f"], "left"];
  } else if (nodeOne.otherdirection === "left") {
    return [1, ["f"], "left"];
  } else if (nodeOne.otherdirection === "down") {
    return [2, ["r", "f"], "left"];
  }
} else if (y2 > y1) {
  if (nodeOne.otherdirection === "up") {
    return [2, ["r", "f"], "right"];
  } else if (nodeOne.otherdirection === "right") {
    return [1, ["f"], "right"];
  } else if (nodeOne.otherdirection === "left") {
    return [3, ["r", "r", "f"], "right"];
  } else if (nodeOne.otherdirection === "down
*/
function manhattanDistance(nodeOne, nodeTwo) {
  let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
  let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
  let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
  return (xChange + yChange);
}
/*
This is a JavaScript function named manhattanDistance that takes two parameters nodeOne and nodeTwo. It calculates the Manhattan distance between two nodes in a grid.

Let's go through the code line by line:


let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
This line creates a new variable named nodeOneCoordinates and sets it equal to an array of two integers. It does this by splitting the id attribute of nodeOne (which is assumed to be in the format x-y) using the dash separator -. It then uses the map function to convert each element of the resulting array to an integer using parseInt().



let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
This line does the same thing as the previous line, but for nodeTwo.


let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
This line calculates the absolute difference between the x-coordinates of the two nodes and sets the result to a new variable named xChange.


let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
This line does the same thing as the previous line, but for the y-coordinates.


return (xChange + yChange);
Finally, this line returns the sum of xChange and yChange, which represents the Manhattan distance between the two nodes.




*/
function weightedManhattanDistance(nodeOne, nodeTwo, nodes) {
  let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
  let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
  let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);

  if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {

    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
      let additionalxChange = 0,
          additionalyChange = 0;
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }

      let otherAdditionalxChange = 0,
          otherAdditionalyChange = 0;
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }

      if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
        xChange += additionalxChange;
        yChange += additionalyChange;
      } else {
        xChange += otherAdditionalxChange;
        yChange += otherAdditionalyChange;
      }
    }


  return xChange + yChange;


}
/*
This is a JavaScript code that defines three functions related to finding distances between two nodes in a graph, particularly in the context of pathfinding algorithms.

The first function is getDistanceTwo, which takes two nodes as input and returns an array containing instructions for how to move from the first node to the second node. It uses a simple heuristic based on the positions of the two nodes to determine the most efficient path to take. If the target node is to the left or right of the current node, the function will determine whether it is closer to move horizontally or vertically, and will return instructions to do so. Similarly, if the target node is above or below the current node, the function will determine whether it is closer to move vertically or horizontally, and will return instructions to do so.

The second function is manhattanDistance, which takes two nodes as input and returns the Manhattan distance between them. The Manhattan distance is a simple metric for the distance between two points that is calculated by taking the sum of the absolute differences of their coordinates. In this case, the function splits the IDs of the two nodes at the "-" character to get their coordinates, converts them to integers, calculates the differences in their x and y coordinates, and returns the sum of these differences.

The third function is weightedManhattanDistance, which is similar to manhattanDistance, but takes into account the weights of the nodes in the graph. The function first calculates the Manhattan distance between the two nodes as before, but then iterates over the nodes between the two endpoints and adds their weights to the distance. It does this in a somewhat convoluted way, by first checking whether the target node is to the right and below the current node or to the right and above the current node, and then adding the weights of the nodes along the horizontal and vertical paths, respectively. Finally, it compares the distances obtained by these two methods and returns the smaller one.  
Here's an explanation of each line of the code you provided:


function getDistanceTwo(nodeOne, nodeTwo) {
This is the definition of a JavaScript function named getDistanceTwo that takes two arguments nodeOne and nodeTwo.


  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
These two lines create new variables currentCoordinates and targetCoordinates by splitting the id properties of nodeOne and nodeTwo on the - character.


  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
These four lines extract the x and y coordinates from currentCoordinates and targetCoordinates using parseInt to convert them from strings to numbers.


  if (x2 < x1) {
    if (nodeOne.otherdirection === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.otherdirection === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.otherdirection === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.otherdirection === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.otherdirection === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.otherdirection === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.otherdirection === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.otherdirection === "down") {
      return [1, ["f"], "down"];
    }
  }
These eight lines contain conditional statements that determine which direction the robot should move in based on whether x2 is greater or less than x1. Depending on the direction that the robot is currently facing (nodeOne.otherdirection), a different set of instructions is returned as an array of values.


  if (y2 < y1) {
    if (nodeOne.otherdirection === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.otherdirection === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.otherdirection === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.otherdirection === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.otherdirection === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.otherdirection === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.otherdirection === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.otherdirection === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
*/
module.exports = bidirectional;

},{"./astar":13}],15:[function(require,module,exports){
function unweightedSearchAlgorithm(nodes, start, target, nodesToAnimate, boardArray, name) {
  if (!start || !target || start === target) {
    return false;
  }
  let structure = [nodes[start]];
  let exploredNodes = {start: true};
  while (structure.length) {
    let currentNode = name === "bfs" ? structure.shift() : structure.pop();
    nodesToAnimate.push(currentNode);
    if (name === "dfs") exploredNodes[currentNode.id] = true;
    currentNode.status = "visited";
    if (currentNode.id === target) {
      return "success";
    }
    let currentNeighbors = getNeighbors(currentNode.id, nodes, boardArray, name);
    currentNeighbors.forEach(neighbor => {
      if (!exploredNodes[neighbor]) {
        if (name === "bfs") exploredNodes[neighbor] = true;
        nodes[neighbor].previousNode = currentNode.id;
        structure.push(nodes[neighbor]);
      }
    });
  }
  return false;
}
/*
This code defines a function unweightedSearchAlgorithm that performs an unweighted search algorithm (either BFS or DFS) on a graph represented as a set of nodes. The function takes several arguments:

nodes: an object representing all nodes in the graph, with each node represented as an object with properties such as id, distance, status, and previousNode.
start: the ID of the node to start the search from.
target: the ID of the node to search for.
nodesToAnimate: an array that will be populated with the nodes that are visited during the search, in the order that they are visited.
boardArray: a 2D array representing the board on which the graph is drawn.
name: the name of the search algorithm to perform (either "bfs" or "dfs").
The function first checks that the start and target nodes are valid and not the same node. It then initializes a structure array with the start node, and an exploredNodes object with the start node ID as a key.

The function enters a loop that continues while there are still nodes to visit in the structure array. On each iteration, the function removes the next node from the structure array (either the first node for BFS, or the last node for DFS) and adds it to the nodesToAnimate array. The function marks the node as visited by changing its status property.

If the current node is the target node, the function returns a string "success" to indicate that the target node has been found.

The function then gets the current node's neighbors by calling the getNeighbors function with the current node's ID, the nodes object, the boardArray, and the search algorithm name. For each neighbor, the function checks if it has been explored before by checking the exploredNodes object. If it has not been explored, the function sets the current node as the neighbor's previous node and adds the neighbor to the structure array. The exploredNodes object is then updated with the neighbor's ID.

If the target node is not found, the function returns false to indicate that the search was unsuccessful.




*/
function getNeighbors(id, nodes, boardArray, name) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (boardArray[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (boardArray[x + 1] && boardArray[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (boardArray[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  return neighbors;
}
/*
This code defines a function getNeighbors that takes in four parameters: id, nodes, boardArray, and name. Here's a line-by-line explanation of the function:

The id parameter is a string in the format "x-y", where x and y are integers representing the row and column of the node, respectively. The function splits this string into an array of two strings, representing x and y, using the split() method.

let coordinates = id.split("-");
The x and y coordinates are then parsed into integers using the parseInt() method.

let x = parseInt(coordinates[0]);
let y = parseInt(coordinates[1]);
An empty array is initialized to hold the neighboring nodes.

let neighbors = [];
A potential neighbor is defined by subtracting or adding 1 to the x or y coordinate of the current node's id.

if (boardArray[x - 1] && boardArray[x - 1][y]) {
  potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
The neighbor is added to the neighbors array if it is not a wall (i.e., the node's status is not "wall") and the search algorithm is not bfs (Breadth-First Search). If the algorithm is bfs, the neighbor is added to the end of the neighbors array using the push() method. Otherwise, the neighbor is added to the beginning of the array using the unshift() method.

if (nodes[potentialNeighbor].status !== "wall") {
  if (name === "bfs") {
    neighbors.push(potentialNeighbor);
  } else {
    neighbors.unshift(potentialNeighbor);
  }
}
The above steps are repeated for each of the node's four neighbors: up, right, down, and left.

Finally, the function returns the neighbors array.
*/
module.exports = unweightedSearchAlgorithm;

},{}],16:[function(require,module,exports){
const astar = require("./astar");

function weightedSearchAlgorithm(nodes, start, target, nodesToAnimate, boardArray, name, heuristic) {
  if (name === "astar") return astar(nodes, start, target, nodesToAnimate, boardArray, name)
  if (!start || !target || start === target) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].direction = "right";
  let unvisitedNodes = Object.keys(nodes);
  while (unvisitedNodes.length) {
    let currentNode = closestNode(nodes, unvisitedNodes);
    while (currentNode.status === "wall" && unvisitedNodes.length) {
      currentNode = closestNode(nodes, unvisitedNodes)
    }
    if (currentNode.distance === Infinity) {
      return false;
    }
    nodesToAnimate.push(currentNode);
    currentNode.status = "visited";
    if (currentNode.id === target) return "success!";
    if (name === "CLA" || name === "greedy") {
      updateNeighbors(nodes, currentNode, boardArray, target, name, start, heuristic);
    } else if (name === "dijkstra") {
      updateNeighbors(nodes, currentNode, boardArray);
    }
  }
}
/*
This is a JavaScript function called weightedSearchAlgorithm that implements various weighted graph search algorithms. It takes in several parameters:

nodes: an object containing all nodes on the graph
start: the id of the starting node
target: the id of the target node
nodesToAnimate: an array to store the sequence of nodes that are visited during the search
boardArray: a 2D array representing the grid of nodes
name: a string specifying the name of the search algorithm to be used
heuristic: an optional parameter that specifies the heuristic function to be used (only applicable to certain algorithms)
The function first checks if the specified search algorithm is A* search, and if so, it calls the astar function with the given parameters to perform the search. If the start and target nodes are not provided or are the same node, the function returns false.

The distance of the start node is set to 0, and its direction is set to "right". The function initializes an array unvisitedNodes containing all the node ids, and enters a loop that continues until all nodes have been visited or the target node has been found.

The closestNode function is called to find the node with the smallest distance value in the unvisitedNodes array. If the node is a wall, the function continues to find the next closest node until it finds a non-wall node or until there are no more nodes in the unvisitedNodes array. If the distance of the current node is infinity, it means that there is no path from the start node to the target node, so the function returns false.

The current node is added to the nodesToAnimate array, and its status is changed to "visited". If the current node is the target node, the function returns the string "success!" to indicate that a path has been found.

Depending on the name of the search algorithm, the updateNeighbors function is called to update the distances and paths of the neighboring nodes of the current node. For the "CLA" and "greedy" algorithms, the function also takes in the target node, start node, and the specified heuristic function (if applicable). For the "dijkstra" algorithm, only the nodes, currentNode, and boardArray parameters are passed.

The function continues to loop until all nodes have been visited or the target node has been found. If the target node is not found, the function returns false.
Here's an explanation of the code line by line:


function weightedSearchAlgorithm(nodes, start, target, nodesToAnimate, boardArray, name, heuristic) {
This function takes in several arguments:

nodes: an object containing all the nodes on the grid.
start: the ID of the starting node.
target: the ID of the target node.
nodesToAnimate: an array to store the nodes that are animated during the search algorithm.
boardArray: a 2D array representing the grid.
name: the name of the search algorithm to be used.
heuristic: the name of the heuristic function to be used.

if (name === "astar") return astar(nodes, start, target, nodesToAnimate, boardArray, name)
If the search algorithm name is "astar", it calls the astar function passing in the same arguments and returns the result.


if (!start || !target || start === target) {
  return false;
}
If the starting node, target node or both are missing, the function returns false.


nodes[start].distance = 0;
nodes[start].direction = "right";
Set the distance of the starting node to 0 and its direction to "right".


let unvisitedNodes = Object.keys(nodes);
Create an array unvisitedNodes containing all the node IDs.


while (unvisitedNodes.length) {
While there are unvisited nodes in unvisitedNodes:


let currentNode = closestNode(nodes, unvisitedNodes);
Get the closest node from unvisitedNodes using the closestNode function and assign it to currentNode.


while (currentNode.status === "wall" && unvisitedNodes.length) {
  currentNode = closestNode(nodes, unvisitedNodes)
}
If currentNode is a wall node, remove it from unvisitedNodes and update currentNode to the next closest node.


if (currentNode.distance === Infinity) {
  return false;
}
If the distance of currentNode is infinity, return false.


nodesToAnimate.push(currentNode);
Add currentNode to the nodesToAnimate array.


currentNode.status = "visited";
Update the status of currentNode to "visited".


if (currentNode.id === target) return "success!";
If currentNode is the target node, return "success!".


if (name === "CLA" || name === "greedy") {
  updateNeighbors(nodes, currentNode, boardArray, target, name, start, heuristic);
} else if (name === "dijkstra") {
  updateNeighbors(nodes, currentNode, boardArray);
}
If the search algorithm is "CLA" or "greedy", call updateNeighbors with the additional arguments boardArray, target, name, start, and heuristic. If the search algorithm is "dijkstra", call updateNeighbors with only nodes, currentNode, and boardArray.

The updateNeighbors function updates the distances of all the neighboring nodes of the current node, based on the algorithm used.

That's a line-by-line explanation of the weightedSearchAlgorithm function! */
function closestNode(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.distance > nodes[unvisitedNodes[i]].distance) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}
/*
This code defines a function called closestNode that takes in two parameters: an object containing nodes and an array of node IDs that have not been visited yet. The function is used to find the unvisited node with the shortest distance from the start node.

The function starts by initializing two variables: currentClosest and index. These variables will be used to keep track of the node with the shortest distance and its index in the unvisitedNodes array.

Next, the function loops through each node ID in the unvisitedNodes array using a for loop. For each node ID, it checks if currentClosest is undefined or if the distance of the current node is shorter than the distance of currentClosest. If either of these conditions is true, currentClosest is updated to the current node and index is set to the index of the current node in the unvisitedNodes array.

Once the loop has finished, the function removes the node with the shortest distance from the unvisitedNodes array using the splice method with the index variable as the starting index and 1 as the number of elements to remove. Finally, the function returns the node with the shortest distance.

Overall, this function helps to implement algorithms that require finding the closest unvisited node from a starting node, such as Dijkstra's algorithm and A* search. */
function updateNeighbors(nodes, node, boardArray, target, name, start, heuristic) {
  let neighbors = getNeighbors(node.id, nodes, boardArray);
  for (let neighbor of neighbors) {
    if (target) {
      updateNode(node, nodes[neighbor], nodes[target], name, nodes, nodes[start], heuristic, boardArray);
    } else {
      updateNode(node, nodes[neighbor]);
    }
  }
}/*
This function takes in nodes, node, boardArray, target, name, start, and heuristic as arguments and updates the neighboring nodes of a given node. Here's a line-by-line explanation:


function updateNeighbors(nodes, node, boardArray, target, name, start, heuristic) {
This line declares a function named updateNeighbors that takes in nodes, node, boardArray, target, name, start, and heuristic as arguments.


let neighbors = getNeighbors(node.id, nodes, boardArray);
This line retrieves the neighbors of node by calling the getNeighbors function and passing in node.id, nodes, and boardArray as arguments. The getNeighbors function returns an array of neighboring node IDs.


for (let neighbor of neighbors) {
This line begins a for loop that will iterate over each neighboring node ID in neighbors.


if (target) {
This line checks if a target node has been specified. If so, the function will call the updateNode function with additional arguments.


updateNode(node, nodes[neighbor], nodes[target], name, nodes, nodes[start], heuristic, boardArray);
This line calls the updateNode function with the current node, the neighbor node object retrieved from nodes, the target node object retrieved from nodes, name, nodes, nodes[start], heuristic, and boardArray. This will update the neighbor node's distance, previousNode, path, and direction properties based on the node, target, and algorithm specified by name.


} else {
If no target node has been specified, this line begins an else block.


updateNode(node, nodes[neighbor]);
This line calls the updateNode function with the current node and the neighbor node object retrieved from nodes. This will update the neighbor node's distance, previousNode, path, and direction properties based solely on the node.

}
  }
}
This line closes the for loop and the function. Overall, this function updates the distance, previousNode, path, and direction properties of neighboring nodes based on the current node and a specified target node (if any) using the specified algorithm name and heuristic.
*/

function averageNumberOfNodesBetween(currentNode) {
  let num = 0;
  while (currentNode.previousNode) {
    num++;
    currentNode = currentNode.previousNode;
  }
  return num;
}
/*
This function takes a node currentNode and calculates the average number of nodes between it and the start node. Here's a line-by-line explanation:


function averageNumberOfNodesBetween(currentNode) {
This line declares a function named averageNumberOfNodesBetween that takes a single parameter currentNode.

bash
Copy code
let num = 0;
This line initializes a variable num with the value of 0.


while (currentNode.previousNode) {
This line begins a while loop that will continue as long as currentNode has a previousNode property.

num++;
Inside the while loop, this line increments the value of num by 1.


currentNode = currentNode.previousNode;
Inside the while loop, this line sets currentNode to its previousNode property, effectively moving "up" the path towards the start node.

}
This line closes the while loop.


return num;
This line returns the final value of num, which represents the number of nodes between currentNode and the start node.

Overall, this function can be used to calculate the average path length for a pathfinding algorithm. By calling this function for each successful pathfinding attempt and averaging the results, you can get a sense of how efficient the algorithm is at finding paths.
*/

function updateNode(currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, boardArray) {
  let distance = getDistance(currentNode, targetNode);
  let distanceToCompare;
  if (actualTargetNode && name === "CLA") {
    let weight = targetNode.weight === 15 ? 15 : 1;
    if (heuristic === "manhattanDistance") {
      distanceToCompare = currentNode.distance + (distance[0] + weight) * manhattanDistance(targetNode, actualTargetNode);
    } else if (heuristic === "poweredManhattanDistance") {
      distanceToCompare = currentNode.distance + targetNode.weight + distance[0] + Math.pow(manhattanDistance(targetNode, actualTargetNode), 2);
    } else if (heuristic === "extraPoweredManhattanDistance") {
      distanceToCompare = currentNode.distance + (distance[0] + weight) * Math.pow(manhattanDistance(targetNode, actualTargetNode), 7);
    }
    let startNodeManhattanDistance = manhattanDistance(actualStartNode, actualTargetNode);
  } else if (actualTargetNode && name === "greedy") {
    distanceToCompare = targetNode.weight + distance[0] + manhattanDistance(targetNode, actualTargetNode);
  } else {
    distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  }
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}
/*
This is a function called updateNode that takes several arguments, including currentNode, targetNode, actualTargetNode, name, nodes, actualStartNode, heuristic, and boardArray. It appears to be used in a pathfinding algorithm to update the distance, path, and direction of a given target node.

Here is a line-by-line explanation of the code:

scss
Copy code
let distance = getDistance(currentNode, targetNode);
This line calculates the distance between the currentNode and the targetNode using a getDistance function that is not shown in the code.

scss
Copy code
let distanceToCompare;
if (actualTargetNode && name === "CLA") {
  let weight = targetNode.weight === 15 ? 15 : 1;
  if (heuristic === "manhattanDistance") {
    distanceToCompare = currentNode.distance + (distance[0] + weight) * manhattanDistance(targetNode, actualTargetNode);
  } else if (heuristic === "poweredManhattanDistance") {
    distanceToCompare = currentNode.distance + targetNode.weight + distance[0] + Math.pow(manhattanDistance(targetNode, actualTargetNode), 2);
  } else if (heuristic === "extraPoweredManhattanDistance") {
    distanceToCompare = currentNode.distance + (distance[0] + weight) * Math.pow(manhattanDistance(targetNode, actualTargetNode), 7);
  }
  let startNodeManhattanDistance = manhattanDistance(actualStartNode, actualTargetNode);
} else if (actualTargetNode && name === "greedy") {
  distanceToCompare = targetNode.weight + distance[0] + manhattanDistance(targetNode, actualTargetNode);
} else {
  distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
}
This block of code checks the name argument to determine which type of algorithm is being used, and calculates the distanceToCompare based on the heuristic used.

If name is "CLA" and actualTargetNode exists, then a weight is calculated based on the targetNode's weight, and the distanceToCompare is calculated using one of three different heuristics (manhattanDistance, poweredManhattanDistance, or extraPoweredManhattanDistance). If name is "greedy" and actualTargetNode exists, then the distanceToCompare is calculated using the targetNode's weight, the distance between the targetNode and the actualTargetNode, and the manhattanDistance heuristic. If neither of these conditions are met, then the distanceToCompare is calculated using the currentNode's distance, the targetNode's weight, and the distance between the currentNode and the targetNode.

scss
Copy code
if (distanceToCompare < targetNode.distance) {
  targetNode.distance = distanceToCompare;
  targetNode.previousNode = currentNode.id;
  targetNode.path = distance[1];
  targetNode.direction = distance[2];
}
Finally, this block of code checks if the distanceToCompare is less than the targetNode's current distance. If it is, then the targetNode's distance, previousNode, path, and direction properties are updated with the new values. This means that the targetNode has been reached with a shorter distance and a better path, so the algorithm should explore this path instead of the previous one.




*/

function getNeighbors(id, nodes, boardArray) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x + 1] && boardArray[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  if (boardArray[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
    if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
  }
  return neighbors;
}
/*
Sure! I'd be happy to explain the code to you.

This is a JavaScript function called getNeighbors, which takes three arguments: id, nodes, and boardArray.

The purpose of this function is to find the neighbors of a given cell in a grid-like structure represented by boardArray.

The first thing the function does is take the id of the current cell and split it into its x and y coordinates, which are stored as integers.

Next, an empty array called neighbors is created to store the neighboring cells that are found.

The function then checks if the cell to the left of the current cell exists and is not a wall. If it is not a wall, then it is considered a potential neighbor and its id is added to the neighbors array.

The function then checks if the cell to the right of the current cell exists and is not a wall. If it is not a wall, then it is considered a potential neighbor and its id is added to the neighbors array.

The function then checks if the cell above the current cell exists and is not a wall. If it is not a wall, then it is considered a potential neighbor and its id is added to the neighbors array.

The function then checks if the cell below the current cell exists and is not a wall. If it is not a wall, then it is considered a potential neighbor and its id is added to the neighbors array.

Finally, the function returns the neighbors array.

In summary, the getNeighbors function takes a cell id, nodes, and boardArray, and returns an array of neighboring cells that are not walls.
This is a JavaScript function called getNeighbors that takes in three parameters: id, nodes, and boardArray. The purpose of this function is to get the neighboring nodes of a specific node on a board.

Here's what each line of the function does:


let coordinates = id.split("-");
This line takes the id parameter, which is a string in the format of "x-y", and splits it into an array called coordinates at the "-" character. For example, if id is "1-2", coordinates will be ["1", "2"].


let x = parseInt(coordinates[0]);
let y = parseInt(coordinates[1]);
These two lines parse the first and second elements of the coordinates array into integers and store them in the x and y variables, respectively.


let neighbors = [];
This line initializes an empty array called neighbors that will be used to store the neighboring node IDs.


let potentialNeighbor;
This line declares a variable called potentialNeighbor without assigning it a value yet. This variable will be used to store the ID of a neighboring node if it is a valid neighbor.


if (boardArray[x - 1] && boardArray[x - 1][y]) {
  potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This code block checks if the node to the left of the current node exists on the board and is not a wall. If it is, it generates the ID of the left node using the current x and y coordinates and stores it in potentialNeighbor. If the left node is not a wall, its ID is pushed into the neighbors array.


if (boardArray[x + 1] && boardArray[x + 1][y]) {
  potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This code block is similar to the previous one, but it checks if the node to the right of the current node exists on the board and is not a wall. If it is, it generates the ID of the right node and checks if it is not a wall before pushing its ID into the neighbors array.


if (boardArray[x][y - 1]) {
  potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This code block checks if the node above the current node exists on the board and is not a wall. If it is, it generates the ID of the top node and checks if it is not a wall before pushing its ID into the neighbors array.


if (boardArray[x][y + 1]) {
  potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
  if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
}
This code block checks if the node below the current node exists on the board and is not a wall. If it is, it generates the ID of the bottom node and checks if it is not a wall before pushing its ID into the neighbors array.


return neighbors;
Finally, the function returns the neighbors array, which contains the IDs of all the valid neighboring nodes of the
current node on the board. The neighbors array can be used to explore the neighboring nodes of a node on the board, for example, in a pathfinding algorithm like A* or Dijkstra's algorithm. */


function getDistance(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }
  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
}
/*
Sure, I'll do my best to explain it in an easy-to-understand way.

This code is a function that takes two nodes (which are parts of a grid) as arguments, and returns a list of instructions that a robot could follow to move from the first node to the second node.

Here's a line-by-line explanation:

javascript
Copy code
function getDistance(nodeOne, nodeTwo) {
This line defines a function called "getDistance" that takes two arguments, which will represent two nodes in a grid.

bash
Copy code
let currentCoordinates = nodeOne.id.split("-");
let targetCoordinates = nodeTwo.id.split("-");
These lines create two variables, "currentCoordinates" and "targetCoordinates," which will be used to store the x and y coordinates of the two nodes. The ".split('-')" method is used to split the id of each node into separate strings at the "-" character, and store the resulting array in each variable.

javascript
Copy code
let x1 = parseInt(currentCoordinates[0]);
let y1 = parseInt(currentCoordinates[1]);
let x2 = parseInt(targetCoordinates[0]);
let y2 = parseInt(targetCoordinates[1]);
These lines create four variables, "x1," "y1," "x2," and "y2," which will be used to store the parsed integer values of the x and y coordinates of each node. The "parseInt()" method is used to convert the strings stored in "currentCoordinates" and "targetCoordinates" to integers.

kotlin
Copy code
if (x2 < x1) {
  if (nodeOne.direction === "up") {
    return [1, ["f"], "up"];
  } else if (nodeOne.direction === "right") {
    return [2, ["l", "f"], "up"];
  } else if (nodeOne.direction === "left") {
    return [2, ["r", "f"], "up"];
  } else if (nodeOne.direction === "down") {
    return [3, ["r", "r", "f"], "up"];
  }
} else if (x2 > x1) {
  if (nodeOne.direction === "up") {
    return [3, ["r", "r", "f"], "down"];
  } else if (nodeOne.direction === "right") {
    return [2, ["r", "f"], "down"];
  } else if (nodeOne.direction === "left") {
    return [2, ["l", "f"], "down"];
  } else if (nodeOne.direction === "down") {
    return [1, ["f"], "down"];
  }
}
These lines check whether the target node is to the left or right of the current node, and if so, what direction the robot is currently facing. Depending on these conditions, the function returns a list of instructions for the robot to move in the correct direction. For example, if the target node is to the left of the current node and the robot is currently facing up, it will return the instructions to turn right ("r"), move forward ("f"), and continue facing up.

kotlin
Copy code
if (y2 < y1) {
  if (nodeOne.direction === "up") {
    return [2, ["l", "f"], "left"];
  } else if (nodeOne.direction === "right") {
    return [3, ["l", "l", "f"], "left"];
  } else if (nodeOne.direction === "left") {
    return [1, ["f"], "left"];
  } else if (nodeOne.direction === "down") {
    return [2, ["r", "f"], "left"];
  }
} else if (y2 */

function manhattanDistance(nodeOne, nodeTwo) {
  let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
  let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
  let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
  return (xChange + yChange);
}
/*

function manhattanDistance(nodeOne, nodeTwo) {
This line defines a function called manhattanDistance that takes two arguments, nodeOne and nodeTwo.


let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
These lines extract the coordinates of each node by splitting their id property using the "-" delimiter and then converting each resulting string into a number using the parseInt() function. The resulting arrays are assigned to nodeOneCoordinates and nodeTwoCoordinates.


let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
These lines calculate the absolute difference between the x and y coordinates of nodeOne and nodeTwo and assign them to xChange and yChange.


return (xChange + yChange);
This line returns the sum of xChange and yChange, which is the Manhattan distance between the two nodes.

Overall, this code calculates the Manhattan distance between two nodes in a grid. The Manhattan distance is the sum of the absolute differences between the x and y coordinates of two points, and is often used in pathfinding algorithms to determine the shortest path between two points on a grid.*/

function weightedManhattanDistance(nodeOne, nodeTwo, nodes) {
  let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
  let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
  let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);

  if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
    let additionalxChange = 0,
        additionalyChange = 0;
    for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
      let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }

    let otherAdditionalxChange = 0,
        otherAdditionalyChange = 0;
    for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
      let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
      let currentNode = nodes[currentId];
      additionalyChange += currentNode.weight;
    }
    for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
      let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
      let currentNode = nodes[currentId];
      additionalxChange += currentNode.weight;
    }

    if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
      xChange += additionalxChange;
      yChange += additionalyChange;
    } else {
      xChange += otherAdditionalxChange;
      yChange += otherAdditionalyChange;
    }
  } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
      let additionalxChange = 0,
          additionalyChange = 0;
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }

      let otherAdditionalxChange = 0,
          otherAdditionalyChange = 0;
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }

      if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
        xChange += additionalxChange;
        yChange += additionalyChange;
      } else {
        xChange += otherAdditionalxChange;
        yChange += otherAdditionalyChange;
      }
    }

  return xChange + yChange;


}
/*
Sure, here's an explanation of each line in the weightedManhattanDistance function:

function weightedManhattanDistance(nodeOne, nodeTwo, nodes) {
This declares a function named weightedManhattanDistance that takes in three parameters: nodeOne, nodeTwo, and nodes.

let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
These lines extract the x and y coordinates of nodeOne and nodeTwo by splitting their id properties (which are in the form "x-y") on the "-" character and converting the resulting strings to integers using the parseInt() function. The resulting x and y coordinates are stored in nodeOneCoordinates and nodeTwoCoordinates, respectively.


let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
These lines calculate the absolute value of the difference between the x and y coordinates of nodeOne and nodeTwo, respectively. These differences represent the number of horizontal and vertical "moves" needed to get from one node to the other in a grid.


if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
This conditional block checks if nodeOne is to the top-left of nodeTwo. If so, it calculates the additional x and y "moves" needed to traverse the diagonal path between the two nodes while taking into account any weights assigned to the nodes along that path.


let additionalxChange = 0,
    additionalyChange = 0;
for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
  let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
  let currentNode = nodes[currentId];
  additionalxChange += currentNode.weight;
}
for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
  let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
  let currentNode = nodes[currentId];
  additionalyChange += currentNode.weight;
}
These lines use two for loops to iterate over the x and y coordinates of the diagonal path between nodeOne and nodeTwo, respectively. For each coordinate, it extracts the corresponding node from the nodes object (using its id property), and adds its weight property to either additionalxChange or additionalyChange, depending on the direction being traversed.


let otherAdditionalxChange = 0,
    otherAdditionalyChange = 0;
for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
  let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
  let currentNode = nodes[currentId];
  additionalyChange += currentNode.weight;
}
for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
  let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
  let currentNode = nodes[currentId];
  additionalxChange += currentNode.weight;
}
These lines do the same thing as the previous block, but they calculate the additional x and y "moves" needed to traverse the diagonal path between the nodes in the opposite direction (from nodeTwo to ` */
module.exports = weightedSearchAlgorithm;

},{"./astar":13}]},{},[4]);
