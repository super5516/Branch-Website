function showtab(tabname, seq) {
  for (i=1 ; i<=6 ; i++) {
    if (document.getElementById(tabname + "_" +i) != null )
    {
      if (i == seq) {
        document.getElementById(tabname + "_" + i).className = "now"
        document.getElementById(tabname + "_" + i + "_content").style.display = "block"
      }
      else
      {
        document.getElementById(tabname + "_" + i).className = "normal"
        document.getElementById(tabname + "_" + i + "_content").style.display = "none"
      }
    }
  }
}
