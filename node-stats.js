	var nodeStats = {
		appendChild: 0,
		removeChild: 0,
		replaceChild: 0,
		insertBefore: 0,
		attached: 0,
		detached: 0
	};

	var isAttached = function(node)
	{
		if (node.parentNode === null) return false;
		if (node.nodeName === "HTML") return true;
		return isAttached(node.parentNode);
	}

	var _appendChild = Node.prototype.appendChild;
	Node.prototype.appendChild = function(newChild)
	{
		nodeStats.appendChild++;
		isAttached(this) ? nodeStats.attached++ : nodeStats.detached++;
		return _appendChild.call(this, newChild);
	};

	var _removeChild = Node.prototype.removeChild;
	Node.prototype.removeChild = function (oldChild)
	{
		nodeStats.removeChild++;
		isAttached(oldChild) ? nodeStats.attached++ : nodeStats.detached++;
		return _removeChild.call(this, oldChild);
	}

	var _replaceChild = Node.prototype.replaceChild;
	Node.prototype.replaceChild = function (newChild, oldChild)
	{
		nodeStats.replaceChild++;
		isAttached(oldChild) ? nodeStats.attached++ : nodeStats.detached++;
		return _replaceChild.call(this, newChild, oldChild);
	}

	var _insertBefore = Node.prototype.insertBefore;
	Node.prototype.insertBefore = function (newChild, refChild)
	{
		nodeStats.insertBefore++;
		isAttached(this) ? nodeStats.attached++ : nodeStats.detached++;
		return _insertBefore.call(this, newChild, refChild);
	}
