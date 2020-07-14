class UserInfo {
    constructor(name, job, pic) {
      this.name = name;
      this.job = job;
      this.pic = pic;
    }
    setUserInfo(nameValue, jobValue, picLink) {
      this.name = nameValue;
      this.job = jobValue;
      this.pic = picLink;
    }
    updateUserInfo(name, job, picEl) {
      name.textContent = this.name;
      job.textContent = this.job;
      picEl.setAttribute('style', `background-image: url(${this.pic})`)
    }
  }

