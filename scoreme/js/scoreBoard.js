var weatherShowcaseApp = angular.module('weatherShowcaseApp',[]);
        weatherShowcaseApp.controller('weatherWidgetController', ['$scope','$http', '$templateCache', function($scope,$http, $templateCache){
            var resetOver = function(){
                    $scope.teamEachOver.push({"lastOverScore":$scope.currentOverScore,"isScoreObj":true});
                    $scope.totalOversDetails.push(angular.copy($scope.teamEachOver));
                    $scope.teamEachOver = [];
                    $scope.ballCount = 0;
                    $scope.extraBallCount  = 0;
                    $scope.currentOverScore = 0;
                    $scope.currentTeamPlayedOvers = Math.ceil($scope.currentTeamPlayedOvers);
                console.log($scope.totalOversDetails);
            };
            $scope.currentTeamScore = 0;
            $scope.totalOversDetails = [];
            $scope.totalWickets = 0;
            $scope.teamEachOver = [];
            $scope.ballCount = 0;
            $scope.currentTeamPlayedOvers = 0;
            $scope.extraBallCount  = 0;
            $scope.currentOverScore = 0;
            $scope.updateScore = function(val){
                if($scope.ballCount == 6){
                    resetOver();
                }
                var ballObj = {};
                if(!isNaN(val)){
                    $scope.currentTeamScore += val;
                    $scope.currentOverScore += val;
                    $scope.ballCount += 1;
                    $scope.currentTeamPlayedOvers  = (parseFloat($scope.currentTeamPlayedOvers) + 0.1).toFixed(1) ; 
                    ballObj["ballCount"] = "Ball"+($scope.ballCount);
                    ballObj["ballStatus"] = val;
                    $scope.teamEachOver.push(ballObj);
                }else{
                    switch(val) {
                        case "WICKET":
                            $scope.totalWickets += 1;
                            $scope.ballCount += 1;
                            ballObj["ballCount"] = "Ball"+($scope.ballCount);
                            $scope.currentTeamPlayedOvers  = (parseFloat($scope.currentTeamPlayedOvers) + 0.1).toFixed(1) ; 
                            ballObj["ballStatus"] = "WK";
                            ballObj["properBall"] = true;
                            
                            break;
                        case "WB":
                            $scope.currentTeamScore += 1;
                            $scope.currentOverScore += 1;
                            $scope.extraBallCount += 1;
                            ballObj["ballCount"] = "ExtraBall"+($scope.extraBallCount);
                            ballObj["ballStatus"] = "WB";
                            ballObj["properBall"] = false;
                            break;
                        case "NB":
                            $scope.currentTeamScore += 1;
                            $scope.currentOverScore += 1;
                            $scope.extraBallCount += 1;
                            ballObj["ballCount"] = "ExtraBall"+($scope.extraBallCount);
                            ballObj["ballStatus"] = "NB";
                            ballObj["properBall"] = false;
                            break;
                        case "BYE":
                            $scope.currentTeamScore += 1;
                            $scope.currentOverScore += 1;
                            $scope.ballCount += 1;
                            ballObj["ballCount"] = "B"+($scope.ballCount);
                            $scope.currentTeamPlayedOvers  = (parseFloat($scope.currentTeamPlayedOvers) + 0.1).toFixed(1) ; 
                            ballObj["ballStatus"] = "BY";
                            ballObj["properBall"] = true;
                            break;
                        default :
                         }
                    $scope.teamEachOver.push(ballObj);
                }
                //console.log($scope.teamEachOver);
            };
        }]);
