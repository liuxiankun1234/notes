/**
 *  
 *  面向对象的设计着重于数据及数据之间的关系，函数式编程则关注于操作如何执行
 *  
 *  管理JS对象的状态
 * 
 * 
 * 问题区域
 *      super 在class中也可以使用？？？？ super.privateProps()
 *      
 * 
 * 
 * 
**/
(function() {
    /**
     *  有一些学生 有编号 姓名 之类的属性
     *  要找到学生的同校的同学 
     *  
     * 
     *  面向对象的解决方案
     *      封装数据 建立数据之间依赖关系
    **/

    class Person {
        constructor(firstname, lastname, ssn) {
            this._firstname = firstname
            this._lastname = lastname
            this._ssn = ssn
            this._address = null
            this._birthYear = null
        }

        get ssn() {
            return this._ssn
        }

        get firstname() {
            return this._firstname
        }

        get lastname() {
            return this._lastname
        }

        get address() {
            return this._address
        }

        get birthYear() {
            return this._birthYear
        }

        set birthYear(birthYear) {
            this._birthYear = birthYear
        }

        set address(address) {
            this._address = address
        }

        toString() {
            return `Person($(this._firstname, this._lastname))`
        }

        peopleInSameCountry(friends) {
            const sameCountryFriends = []
            for(let i = 0, length = friends.length; i < length; i++) {
                const friend = friends[i]
                if(this.address.country === friend.address.country){
                    sameCountryFriends.push(friend)
                }
            }
            return sameCountryFriends
        }
    }
    
    class Student extends Person{
        constructor(firstname, lastname, ssn, school) {
            super(firstname, lastname, ssn)
            this._school = school
        }
        get school() {
            return this._school
        }

        getSchool() {
            return this.school
        }

        studentsInSameCountryAndSchool(friends) {
            const closeFriends = this.peopleInSameCountry(friends)
            console.log(closeFriends)
            const result = []
            for(let i = 0, length = closeFriends.length; i < length; i++){
                const friend = closeFriends[i]
                console.log(friend.school, this.school)
                if(friend.school === this.school){
                    result.push(friend)
                }
            }
            console.log(result)
            return result
        }
    }
    class Address{
        constructor(country) {
            this.country = country
        }
        getCountry() {
            return this.country
        }
    }

    var student1 = new Student('刘', '先坤', '1101010527', '理工');
    student1.address = new Address('China')

    var student2 = new Student('张', '夕月', '1101010528', '农大');
    student2.address = new Address('China')

    var student3 = new Student('金', '龙', '110101059', '职业学院');
    student3.address = new Address('kroea')

    var student4 = new Student('刘', '洪城', '1101010527', '理工');
    student4.address = new Address('China')

    const fs = student1.studentsInSameCountryAndSchool([student2, student3, student4])
    console.log(fs)

    /**
     *  函数式解决方案
     *          
     * 
    **/
    function selector(country, school) {
        return function(person) {
            return person.address.getCountry() === country && person.getSchool() === school
        }
    }
    const findStudentsBy = function(firends, selector) {
        return firends.filter(selector)
    }
    const results = findStudentsBy([student1, student2, student3, student4], selector('China', '理工'))
    console.log(results)
})();
