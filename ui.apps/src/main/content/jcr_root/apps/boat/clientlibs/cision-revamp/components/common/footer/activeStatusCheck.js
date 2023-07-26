'use strict';

use(function() {
    var path = this.path;
    var currentPath = currentPage.getPath();
    var isActive = false;

    if(path != null){
    	var status = path.localeCompare(currentPath);
    }
    if (status == 0) {
        isActive = true;
    }

    return {
        isActive: isActive,
        path: path,
        status: status,
        currentPath: currentPath
    };
});
